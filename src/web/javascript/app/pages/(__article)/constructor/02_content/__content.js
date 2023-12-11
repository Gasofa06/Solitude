import { Build_Summary } from './summary.js';
import { Build_Sections } from './sections/sections.js';

import { Build_Table_Contents } from './table_contents.js';

/**
 * @info Construye y devuelve el contenido HTML del contenido principal
 * de la página del artículo. Constituido por el cuerpo del artículo y
 * la tabla de contenidos.
 *
 * @param {string} _body_article - Texto del artículo que se utilizará
 * para construir dicho contenido.
 *
 * @return {string} - Cadena de texto que contiene el contenido principal
 * del artículo en formato HTML.
 */
export function Build_Content(_body_article) {
    let article_body =
        '<div class="article_body">' +
        Build_Summary(_body_article) +
        Build_Sections(_body_article) +
        '</div>';

    /*
     * Es necesario que primero se llamen a las funciones Build_Summary
     * y Build_Sections antes de crear la tabla de contenidos.
     */
    let table_contents = Build_Table_Contents(_body_article);

    let main_content =
        '<div class="container">' + article_body + table_contents + '</div>';

    return main_content;
}
