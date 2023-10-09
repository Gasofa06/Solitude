/**
 * @info Construye y devuelve el contenido HTML para la tabla de contenidos
 * del artículo.
 *
 * @returns {string} - Cadena de texto que contiene el contenido HTML de la
 * tabla de contenidos.
 */
export function Build_Table_Contents() {
    /*
     * Recorremos la Array que contiene todas las secciones y generamos los
     * enlaces con los que el usuario podrá navegar a las diferentes secciones
     * o contenidos del artículo.
     */
    let arr_sections = window.identifier_coordinator.get_sections_with_id();

    let sections_links = arr_sections
        .map(_sec_name => {
            let link = `<a>${_sec_name}</a>`;

            return `<li>${link}</li>`;
        })
        .join('');

    let table_of_contents =
        '<nav class="table_contents">' +
        '<p class="title">In This Article</p>' +
        '<ul class="contents">' +
        sections_links +
        '</ul>' +
        '</nav>';

    return table_of_contents;
}
