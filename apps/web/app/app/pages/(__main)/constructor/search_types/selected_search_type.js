import { SEARCH_TYPES } from '../../../../../[constants]/constants.js';

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
