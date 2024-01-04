import { Get_Authors } from './authors.js';
import { Get_Release_Date } from './release_date.js';

/**
 * @info Devuelve información adicional sobre el artículo en formato HTML.
 *
 * @param {string} _article_information - Texto que contiene información sobre el artículo.
 *
 * @return {string} - Cadena de texto que contiene el contenido HTML de la
 * información adicional.
 */
export function Add_Extra_Information(_article_information) {
    let extra_information =
        '<div class="extra_information">' +
        Get_Authors(_article_information) +
        Get_Release_Date(_article_information) +
        '</div>';

    return extra_information;
}
