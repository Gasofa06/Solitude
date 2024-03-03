import { IdentifierCoordinator } from '/javascript/search/page-article/__helpers__/identifier_coordinator.js';

import { Header } from '/javascript/search/page-article/sections/header.js';
import { Body } from '/javascript/search/page-article/sections/body.js';
import { Footer } from '/javascript/search/page-article/sections/footer.js';

export function BuildArticle(response) {
    /*
     * Separador que divide los elementos vinculados al artículo (título,
     * autores, categorías...) del cuerpo principal del mismo.
     */
    let _s = ']$[';

    let article_info = response.substring(0, response.indexOf(_s));
    let article_body = response.substring(response.indexOf(_s) + _s.length);

    /*
     * Inicializando el coordinador global para todos los identificadores
     * necesarios en el artículo (para secciones, gráficos...).
     */
    window.identifier_coordinator = new IdentifierCoordinator();

    let article = Header(article_info) + Body(article_body) + Footer();

    window.article.insertAdjacentHTML('afterbegin', article);
}
