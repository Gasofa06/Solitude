import { SEARCH_TYPES } from '../../../../constants.js';

/**
 * @info Esta función inicializa la variable global 'selected_search_type'
 * y realiza acciones (en la interfaz) relacionadas con la elección del
 * tipo de búsqueda.
 */
export function Build_Selected_Search_Type() {
    let default_idx = 0;

    let arr_search_types_names = Object.keys(SEARCH_TYPES);
    let type_name = arr_search_types_names[default_idx];

    let input = window.arr_search_types_inputs[default_idx];
    input.classList.add('selected');

    let placeholder = SEARCH_TYPES[type_name].placeholder;
    window.search_bar.setAttribute('placeholder', placeholder);

    window.html_selected_search_type.innerHTML = type_name.toUpperCase();

    window.selected_search_type = type_name;
}

/**
 * @info Genera el contenido para el menú desplegable que permite
 * seleccionar el tipo de búsqueda deseado.
 */
export function Build_Dropdown_Search_Types() {
    let container = document.getElementById('search-types-list');

    let arr_search_types_names = Object.keys(SEARCH_TYPES);

    let dopdown_components = arr_search_types_names
        .map(_name => {
            var search_type =
                '<li>' + `<input type="button" value="${_name}"/>` + '</li>';

            return search_type;
        })
        .join('');

    container.insertAdjacentHTML('beforeend', dopdown_components);

    window.arr_search_types_inputs = container.querySelectorAll(
        '#search-types-list li input',
    );
}

export default function Construct() {
    Build_Dropdown_Search_Types();
    Build_Selected_Search_Type();
}
