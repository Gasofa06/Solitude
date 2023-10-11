import { Build_Title_Suggestions } from './constructors/suggestions.js';
import { Build_Title_Suggestions_Not_Found } from './constructors/not_found_suggestions.js';

import { Click_Title_Suggestion } from './actions/click_suggestion.js';

export function Suggest_Titles(_prefix, _max_suggestions) {
    let arr_match_titles = window.trie_articles_data.suggest(
        _prefix,
        _max_suggestions,
    );

    if (arr_match_titles.length > 0) {
        Build_Title_Suggestions(arr_match_titles, _prefix);
    } else {
        Build_Title_Suggestions_Not_Found();
    }

    window.search_suggestions
        .querySelectorAll('.search_suggestions_container .suggestion input')
        .forEach(input => {
            input.onclick = _e => Click_Title_Suggestion(_e);
        });
}
