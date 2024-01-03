import { Clear_Suggestions } from '../../../platform_utils/index.js';

import { Suggest_Titles } from './by_title/__suggest_titles.js';
import { Suggest_Topics } from './by_topics/__suggest_topic.js';

/**
 * @info Modifica las recomendaciones de búsqueda en la barra de navegación.
 * Su objetivo principal es ajustar el tipo de sugerencia para generar
 * recomendaciones apropiadas según el tipo de búsqueda seleccionado.
 *
 * @param {Event} _e - El evento de entrada que activó la función.
 */
export function Search_Suggestions_Manager(_e) {
    Clear_Suggestions();

    var searched_text = _e.target.value;
    if (searched_text.length === 0) {
        return;
    }

    switch (window.selected_search_type) {
        case 'Title':
            var max_suggestions = 5;

            Suggest_Titles(searched_text, max_suggestions);
            break;

        case 'Topic':
            var max_suggestions = 5;

            Suggest_Topics(searched_text, max_suggestions);
            break;

        case 'REF.':
            break;
    }
}
