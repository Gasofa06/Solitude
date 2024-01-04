import {
    Start_Loading,
    Stop_Loading,
} from '../../../../../utils/loading_information.js';

import '../../../../../utils/bz2.js';

import { api } from '../../../../../services/api.js';
import {
    generate_query,
    decode_response,
} from '../../../../../../pkg/client.js';

import { Find_Requested_Article } from './find.js';

/**
 * @info Genera la solicitud, la envia al servidor, espera su respuesta y,
 * una vez recibida, la procesa para que esté lista para ser utilizada en
 * la creación de la página del artículo.
 *
 * @param {number} _group_idx - El índice del grupo de artículos al que
 * pertenece el artículo en el servidor.
 *
 * @param {string} _title - El título del artículo que se desea cargar.
 */
export async function Load_Article(_group_idx, _title) {
    Start_Loading('Loading article');

    let query = generate_query(window.client, window.id, _group_idx);
    let server_response = new Uint8Array(await api.query(query));

    let result = decode_response(window.client, server_response);
    let decompressed_result = bz2.decompress(result);

    let processed_response = new TextDecoder('utf-8').decode(
        decompressed_result,
    );

    let article = Find_Requested_Article(processed_response, _title);

    window.page_controller.go_article_page(article);

    Stop_Loading('Article loaded');
}
