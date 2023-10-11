import { Article_Query_By_Title } from './by_title/__title_query.js';
import { Articles_Query_By_Topics } from './by_topics/__query_topics.js';

/**
 * @info Adapta el tipo de solicitud que se deberá llevarse a cabo, en
 * función del tipo de búsqueda seleccionado.
 */
export const Make_Query_Manager = (_selected_topics = null) => {
    console.log('Making the query...');
    window.make_query.disabled = true;

    switch (window.selected_search_type) {
        case 'Title':
            Article_Query_By_Title();
            break;

        case 'Topic':
            Articles_Query_By_Topics(_selected_topics);
            break;

        case 'REF.':
            // Article_Query_By_Reference();
            break;
    }

    window.make_query.disabled = false;
    console.log('Query finalized.');
};
