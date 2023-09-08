import { Clear_Suggestions } from '../../../platform_utils/__utils.js';

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
            '.dropdown_li input, .container_selected_content input, #dropdown_search_type_content_sub',
        )
    ) {
        document.getElementById('checkbox_drop_search_types').checked = false;
    }

    /*
     * Si se presiona fuera del desplegable que muestra las sugerencias
     * de busqueda, el despleable desaparecera.
     */
    if (
        !clicked_element.matches('#search_bar_input_text, #search_suggestions')
    ) {
        Clear_Suggestions();
    }
};
