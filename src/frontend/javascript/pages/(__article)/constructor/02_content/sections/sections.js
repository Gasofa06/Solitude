import { Get_Section_Title } from './title.js';
import { Get_Section_Paragraphs } from './paragraphs.js';

/**
 * @info Genera y devuelve las secciones del artículo.
 *
 * @param {string} _body_article - Texto que contiene las diversas vsecciones
 * del artículo.
 *
 * @return {string} - Cadena de texto que contiene todas las secciones del artículo.
 */
export function Build_Sections(_body_article) {
    /*
     * Iteramos sobre el texto para encontrar todas las secciones y almacenarlas en
     * una `Array`. La secciones se encuentran entre "ϛ:" y "‽".
     */
    let regex = /ϛ:(.*?)‽/g;
    let arr_sections = [];

    var match;

    while ((match = regex.exec(_body_article)) !== null) {
        if (match.length > 1) {
            arr_sections.push(match[1]);
        } else {
            alert('No section data found.');
        }
    }

    if (arr_sections.length === 0) {
        alert('The current article does not have any section.');
        return 'Error';
    }

    /*
     * Generamos el contenido HTML que compone las secciones del artículo, incluyendo
     * párrafos, títulos y otros elementos.
     *
     * Los párrafos se separan por: "¶". El primero de éstos, es el título del artículo.
     */
    let html_sections = '';

    arr_sections.forEach((_section, _idx) => {
        let arr_split = _section.split('¶');

        if (arr_split.length < 2) {
            alert('The current section is empty.');
            return 'Error';
        }

        let section_title = arr_split[0];
        let arr_paragraphs = arr_split.slice(1, arr_split.length);

        let section_id =
            window.identifier_coordinator.generate_section_id(section_title);

        let html_section_title = Get_Section_Title(_idx + 1, section_title);
        let html_section_paragraphs = Get_Section_Paragraphs(arr_paragraphs);

        html_sections +=
            `<section id="${section_id}">` +
            html_section_title +
            html_section_paragraphs +
            '</section>';
    });

    return html_sections;
}
