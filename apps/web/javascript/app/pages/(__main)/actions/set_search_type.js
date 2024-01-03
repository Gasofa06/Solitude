import { SEARCH_TYPES } from '../../../__constants__/__constants.js';

import {
    Find_Key_Index,
    Clear_Search_Text_Input,
} from '../../../platform_utils/index.js';

/**
 * @info Actualiza la barra de búsqueda con un nuevo marcador de posición
 * y realiza acciones adicionales.
 *
 * @param {string} _placeholder - El nuevo marcador de posición para la
 * sbarra de búsqueda.
 */
const Update_Search_Bar_Type = _placeholder => {
    let input = window.search_bar;

    Clear_Search_Text_Input();
    input.setAttribute('placeholder', _placeholder);

    input.click();
    input.select();
};

/**
 * @info Cambia el tipo de búsqueda y realiza las actualizaciones
 * necesarias en la interfaz.
 *
 * @param {string} _new_type - El nuevo tipo de búsqueda seleccionado.
 */
export function Set_Search_Type(_new_type) {
    let new_idx = Find_Key_Index(SEARCH_TYPES, _new_type);
    let curr_idx = Find_Key_Index(SEARCH_TYPES, window.selected_search_type);

    if (new_idx !== -1) {
        let curr_input = window.arr_search_types_inputs[curr_idx];
        curr_input.classList.remove('selected');

        let new_input = window.arr_search_types_inputs[new_idx];
        new_input.classList.add('selected');

        let new_placeholder = SEARCH_TYPES[_new_type].placeholder;
        Update_Search_Bar_Type(new_placeholder);

        window.html_selected_search_type.innerHTML = _new_type.toUpperCase();

        window.selected_search_type = _new_type;
    }
}
