/**
 * @info Construye y devuelve el título de alguna sección, en formato HTML.
 *
 * @param {number} _num - El número de la sección.
 * @param {string} _title - El título de la sección.
 *
 * @returns {string} - El título de la sección formateado en HTML.
 */
export function Get_Section_Title(_num, _title) {
    let section_title = `${_num}.&nbsp;&nbsp;&nbsp;${_title}`;
    let html_section_title = `<h4 class="title_section">${section_title}</h4>`;

    return html_section_title;
}
