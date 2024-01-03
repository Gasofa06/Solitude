/**
 * @info Muestra las sugerencias de búsqueda
 * en la interfaz e inserta una funciòn para
 * cuando se hace clic en alguna de las
 * sugerencias.
 *
 * @param {Array of strings} _suggestions - Las
 * sugerencias de búsqueda que se mostraran en
 * pantalla.
 *
 * @param {string} _search_text - El texto de
 * búsqueda ingresado por el usuario.
 */
export function Build_Title_Suggestions(_suggestions, _search_text) {
    // prettier-ignore
    var hmtl_suggestions =
        '<div class="search_suggestions_container">' +
            _suggestions
                .map(title => {
                    let matching_txt = title.substr(0, _search_text.length);
                    let not_matching_txt = title.substr(_search_text.length);

                    return (
                        '<li class="suggestion">' +
                            '<input type="button" data-title="' + title + '">' +
                            '<p>' +
                                '<b>' + matching_txt + '</b>' +
                                not_matching_txt +
                            '</p>' +
                        '</li>'
                    );
                })
                .join('') +
        '</div>';

    window.search_suggestions.insertAdjacentHTML(
        'afterbegin',
        hmtl_suggestions,
    );
}
