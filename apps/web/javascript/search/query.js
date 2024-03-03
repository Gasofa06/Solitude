import '/javascript/utils/bz2.js';
import { api } from '/javascript/services/api.js';
import { generate_query, decode_response } from '/pkg/client.js';
import { UploadClientState } from '/javascript/services/client/client.js';
import { StartLoading, StopLoading } from '/javascript/utils/loading-info.js';

import { ProcessTitle } from '/javascript/utils/process-title.js';

function FindRequestedArticle(response, target_title) {
    /*
     * Carácter de separación utilizado para marcar el final de un artículo.
     */
    let _s = 'Ω';

    // T:Centralización del Poder‽
    let regex = /\T:(.*?)‽/;

    let arr_articles = response.split(_s).filter(_article => {
        let title = regex.exec(_article);

        if (!title || title.length <= 1) return false;
        if (ProcessTitle(title[1]) === target_title) return true;
    });

    if (arr_articles.length === 0) {
        alert(
            'Error, there is no article with the same title as the one requested.',
        );
    }

    let article = arr_articles[0];
    return article;
}

async function LoadArticle(idx, title) {
    StartLoading("Generate query and wait for the server's response...");

    let query = generate_query(window.client, window.id, idx);
    var response = new Uint8Array(await api.query(query));

    StopLoading('Response recived.');

    StartLoading('Loading article...');

    response = decode_response(window.client, response);
    response = bz2.decompress(response);
    response = new TextDecoder('utf-8').decode(response);

    let article_txt = FindRequestedArticle(response, title);
    window.page_controller.go_article_page(article_txt);

    StopLoading('Article loaded.');
}

async function QueryByTitle() {
    if (!window.client_has_set_up) {
        let id = await UploadClientState();

        if (id) {
            window.id = id;
            window.client_has_set_up = true;
        } else return;
    }

    let title = window.search_bar.value;
    let idx = window.trie_articles_data.get_server_idx(title);

    await LoadArticle(idx, title);
}

let MakeQuery = (_selected_topics = null) => {
    console.log('Making the query...');
    window.make_query.disabled = true;

    switch (window.selected_search_type) {
        case 'Title':
            QueryByTitle();
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

export function InitQuery() {
    window.make_query.addEventListener('click', () => MakeQuery());
}
