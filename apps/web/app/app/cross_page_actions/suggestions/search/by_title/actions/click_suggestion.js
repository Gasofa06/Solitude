import { Clear_Suggestions } from '../../../../../../utils/clear.js';

export const Click_Title_Suggestion = _e => {
    Clear_Suggestions();

    let clicked_title = _e.target.getAttribute('data-title');
    window.search_bar.value = clicked_title;

    window.make_query.click();
};
