import { Upload_State } from '../../../../../client/client.js';

import { Load_Article } from './load.js';

/**
 * @info Esta función realiza la búsqueda y la carga de algún artículo
 * concreto, definido por el nombre de su título.
 */
export async function Article_Query_By_Title() {
    if (!window.client_has_set_up) {
        let id = await Upload_State();

        if (id) {
            window.id = id;
            window.client_has_set_up = true;
        } else {
            return;
        }
    }

    let article_title = window.search_bar.value;

    let article_group_idx =
        window.trie_articles_data.search_server_index(article_title);

    await Load_Article(article_group_idx, 'Centralización del Poder');
}
