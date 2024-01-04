import { Add_Topics } from './topics.js';
import { Add_Back_Top } from './back_top.js';

/**
 * @info Construye el contenido del pie de página de un artículo.
 *
 * @param {string} _article_information - La información del artículo que se
 * utilizará para generar el pie de página.
 *
 * @returns {string} El fragmento de código HTML que representa el pie de página
 * del artículo.
 */
export function Build_Footer(_article_information) {
    let footer =
        '<footer>' +
        Add_Topics(_article_information) +
        Add_Back_Top() +
        '</footer>';

    return footer;
}
