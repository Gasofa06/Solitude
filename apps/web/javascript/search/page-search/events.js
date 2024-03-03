import { Find_Key_Index } from '/javascript/utils/obj_handle.js';

import {
    Clear_Suggestions,
    Clear_Search_Text_Input,
} from '/javascript/utils/clear.js';

/**
 * @info Actualiza la barra de búsqueda con un nuevo marcador de posición
 * y realiza acciones adicionales.
 *
 * @param {string} _placeholder - El nuevo marcador de posición para la
 * sbarra de búsqueda.
 */
let Update_Search_Bar_Type = _placeholder => {
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
function Set_Search_Type(_new_type, search_types) {
    let new_idx = Find_Key_Index(search_types, _new_type);
    let curr_idx = Find_Key_Index(search_types, window.selected_search_type);

    if (new_idx !== -1) {
        let curr_input = window.arr_search_types_inputs[curr_idx];
        curr_input.classList.remove('selected');

        let new_input = window.arr_search_types_inputs[new_idx];
        new_input.classList.add('selected');

        let new_placeholder = search_types[_new_type].placeholder;
        Update_Search_Bar_Type(new_placeholder);

        window.html_selected_search_type.innerHTML = _new_type.toUpperCase();

        window.selected_search_type = _new_type;
    }
}

/**
 * @info Función que se ejecutará en el evento `window.onclick`. Controla
 * el comportamiento de elementos al hacer clic en la ventana, aolo cuando
 * el uario està en la página principal.
 *
 * @param {Event} _event - El objeto de evento que desencadena la función.
 */
export const Main_Page_Click = _event => {
    let clicked_element = _event.target;

    /*
     * Si el clic no se produce dentro del desplegable de selección de tipo
     * de búsqueda, se oculta el desplegable.
     */
    if (
        !clicked_element.matches(
            '#search-types-list, #selected-search-type > *',
        )
    ) {
        document.querySelector('#selected-search-type input').checked = false;
    }

    /*
     * Si se presiona fuera del desplegable que muestra las sugerencias
     * de busqueda, el despleable desaparecera.
     */
    if (!clicked_element.matches('.write-bar, #search_suggestions')) {
        Clear_Suggestions();
    }
};

export function InitEvents(_re, search_types) {
    if (_re === false) {
        window.arr_search_types_inputs.forEach(_input => {
            _input.onclick = _e => {
                let type = _e.target.value;

                Set_Search_Type(type, search_types);
            };
        });
    }

    window.addEventListener('click', Main_Page_Click);
}
