import { SEARCH_TYPES } from '../../../../__constants__/__constants.js';

/**
 * @info Genera el contenido para el menú desplegable que permite
 * seleccionar el tipo de búsqueda deseado.
 */
export function Build_Dropdown_Search_Types() {
    let container = document.getElementById('dropdown_search_type_content_sub');

    let arr_search_types_names = Object.keys(SEARCH_TYPES);

    let dopdown_components = arr_search_types_names
        .map(_name => {
            var search_type =
                '<li class="dropdown_li">' +
                `<input type="button" value="${_name}"/>` +
                '</li>';

            return search_type;
        })
        .join('');

    container.insertAdjacentHTML('beforeend', dopdown_components);

    window.arr_search_types_inputs =
        container.querySelectorAll('.dropdown_li input');
}
