import { Build_Topics_Suggestions } from './constructors/suggestions.js';
import { Click_Topic_Suggestion } from './actions/click_suggestion.js';

export function Suggest_Topics(_prefix, _max_suggestions) {
    if (!window.selected_topics) {
        window.selected_topics = [];
    }

    var arr_match_topics =
        window.inverted_index_topics_title.valid_topics.filter(_topic => {
            return _topic.startsWith(_prefix);
        });

    var len = arr_match_topics.length;

    console.log(len);

    if (len > 0) {
        console.log(len);
        arr_match_topics.sort();

        arr_match_topics =
            len > _max_suggestions
                ? arr_match_topics.slice(0, _max_suggestions)
                : arr_match_topics;

        Build_Topics_Suggestions(arr_match_topics, _prefix);
    }

    (function () {
        let all_input_suggestions = window.search_suggestions.querySelectorAll(
            '.search_suggestions_container .suggestion input',
        );

        all_input_suggestions.forEach(input => {
            input.onclick = _e => Click_Topic_Suggestion(_e);
        });
    })();
}
