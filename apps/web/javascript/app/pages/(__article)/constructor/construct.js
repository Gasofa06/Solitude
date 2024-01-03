import { IdentifierCoordinator } from './__helpers__/identifier_coordinator.js';

import { Build_Header } from './01_header/__header.js';
import { Build_Content } from './02_content/__content.js';
import { Build_Footer } from './03_footer/__footer.js';

/**
 * @info Construye y agrega un artículo HTML a la interfaz.
 *
 * @param {string} _article - Texto que se utilizará para construir
 * el contenido del artículo. Consiste en el mensaje, ya descomprimido
 * y descifrado, que devuelve el servidor.
 */
export default function Construct(_article) {
    /*
     * Separador que divide los elementos vinculados al artículo (título,
     * autores, categorías...) del cuerpo principal del mismo.
     */
    let _split = ']$[';

    let article_information = _article.substring(0, _article.indexOf(_split));

    let body_article = _article.substring(
        _article.indexOf(_split) + _split.length,
    );

    /*
     * Inicializando el coordinador global para todos los identificadores
     * necesarios en el artículo (para secciones, gráficos...).
     */
    window.identifier_coordinator = new IdentifierCoordinator();

    let html_article =
        '<article>' +
        Build_Header(article_information) +
        Build_Content(body_article) +
        Build_Footer(article_information) +
        '</article>';

    window.query_result_container.insertAdjacentHTML(
        'afterbegin',
        html_article,
    );
}
