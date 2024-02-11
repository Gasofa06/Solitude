import { Add_Backward_Link } from './backward_link.js';
import { Add_Title } from './title.js';
import { Add_Extra_Information } from './extra_information/extra_information.js';

/**
 * @info Generamos y devolvemos el contenido para el encabezado del artículo.
 *
 * @param {string} _article_information - Texto que se utilizará para construir
 * el contenido del encabezado del artículo. Contiene información sobre el mismo.
 *
 * @returns {string} - Cadena de texto que contiene el contenido HTML
 * del encabezado del artículo.
 */
export function Build_Header(_article_information) {
    let header_id = window.identifier_coordinator.generate_section_id('Header');

    let backward_link = Add_Backward_Link();
    let title = Add_Title(_article_information);
    let extra_info = Add_Extra_Information(_article_information);

    let header =
        `<header id="${header_id}">` +
        backward_link +
        title +
        extra_info +
        '</header>';

    return header;
}
