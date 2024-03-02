import { Clear_Suggestions } from '../../../../utils/clear.js';

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
