import '/app/utils/bz2.js';
import { api } from '/app/services/api.js';
import { generate_query, decode_response } from '/pkg/client.js';
import { UploadClientState } from '/app/services/client/client.js';
import { StartLoading, StopLoading } from '/app/utils/loading-info.js';

/**
 * @info Busca el artículo solicitado en el resultado recibido por el servidor.
 *
 * @param {string} _plaintext_response - El resultado preprocesado de la solicitud.
 *
 * @param {string} _target_title - El título del artículo deseado por el usuario.
 *
 * @returns {string|boolean} - El contenido del artículo deseado (listo para ser
 * utilizado como modelo para construir el artículo) se proporcionará en caso de
 * encontrarse, o se devolverá `false` si no se encuentra
 */
function Find_Requested_Article(response, target_title) {
    target_title = target_title.toLowerCase();

    /*
     * Carácter de separación utilizado para marcar el final de un artículo.
     */
    let separation_letter = 'Ω';

    /*
     * Expresión regular para buscar el título de un artículo cualquiera.
     * Los títulos están comprendidos entre "T:" y "‽".
     *
     * ej. T:Centralización del Poder‽
     */
    let regex = /\T:(.*?)‽/;

    let arr_articles = response.split(separation_letter).filter(_article => {
        let title = regex.exec(_article);

        if (!title || title.length <= 1) return false;

        if (title[1].toLowerCase() === target_title) return true;
    });

    if (arr_articles.length === 0) {
        alert(
            'Error, there is no article with the same title as the one requested.',
        );
    }

    let article = arr_articles[0];
    return article;
}

/**
 * @info Genera la solicitud, la envia al servidor, espera su respuesta y,
 * una vez recibida, la procesa para que esté lista para ser utilizada en
 * la creación de la página del artículo.
 *
 * @param {number} group_idx - El índice del grupo de artículos al que
 * pertenece el artículo en el servidor.
 *
 * @param {string} title - El título del artículo que se desea cargar.
 */
async function LoadArticle(group_idx, title) {
    StartLoading('Loading article');

    let query = generate_query(window.client, window.id, group_idx);
    let server_response = new Uint8Array(await api.query(query));

    let result = decode_response(window.client, server_response);
    let decompressed_result = bz2.decompress(result);

    let processed_response = new TextDecoder('utf-8').decode(
        decompressed_result,
    );

    let article = Find_Requested_Article(processed_response, title);

    window.page_controller.go_article_page(article);

    StopLoading('Article loaded');
}

async function Article_Query_By_Title() {
    if (!window.client_has_set_up) {
        let id = await UploadClientState();

        if (id) {
            window.id = id;
            window.client_has_set_up = true;
        } else {
            return;
        }
    }

    let article_title = window.search_bar.value;

    let article_group_idx =
        window.trie_articles_data.get_server_idx(article_title);

    await LoadArticle(article_group_idx, 'Centralización del Poder');
}

const MakeQuery = (_selected_topics = null) => {
    console.log('Making the query...');
    window.make_query.disabled = true;

    switch (window.selected_search_type) {
        case 'Title':
            Article_Query_By_Title();
            break;

        case 'Topic':
            Articles_Query_By_Topics(_selected_topics);
            break;

        case 'REF.':
            Article_Query_By_Reference();
            break;
    }

    window.make_query.disabled = false;
    console.log('Query finalized.');
};

function Articles_Query_By_Topics() {
    let article_titles =
        window.inverted_index_topics_title.get_articles_by_topics(
            window.selected_topics,
        );

    window.page_controller.load_index_articles_page(article_titles);
}

async function Article_Query_By_Reference() {
    return;
}

export default function Initialize_Query_Events() {
    window.make_query.onclick = () => MakeQuery();
}
