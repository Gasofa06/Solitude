import {
    Clear_Suggestions,
    Clear_Search_Text_Input,
} from '/app/utils/clear.js';
import { Contains_Obj } from '/app/utils/obj_handle.js';

function Suggest_Topics(_prefix, _max_suggestions) {
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

const Click_Topic_Suggestion = _e => {
    Clear_Suggestions();
    Clear_Search_Text_Input();

    window.search_bar.select();

    let clicked_topic = _e.target.getAttribute('data-topic');

    let contains_obj = Contains_Obj(clicked_topic, window.selected_topics);

    if (!contains_obj) {
        window.selected_topics.push(clicked_topic);
        // console.log(clicked_topic + " have been added.")
    } else {
        window.selected_topics = window.selected_topics.filter(
            _topic => _topic != clicked_topic,
        );
        // console.log(clicked_topic + " have been eliminated.")
    }

    Show_Selected_Topics();
};

const Click_Cross_Topics = _btn => {
    let topic = _btn.getAttribute('data-topic');

    window.selected_topics = window.selected_topics.filter(_t => _t != topic);
    // console.log(topic + " have been eliminated.")

    window.search_bar.select();
    Show_Selected_Topics();
};

function Show_Selected_Topics() {
    let html_selected_topics = document.querySelector(
        'ul.selected_topics_container',
    );

    let element_exists = !!html_selected_topics;
    if (element_exists) html_selected_topics.remove();

    if (window.selected_topics.length == 0) return;

    let cross_svg =
        '<svg viewBox="0 0 24 24"> <path d="M20 20L4 4.00003M20 4L4.00002 20"/> </svg>';

    // prettier-ignore
    let new_html_selected_topics = 
    '<ul class="selected_topics_container">' + 
        window.selected_topics
            .map(_topic => {
                return (
                    '<li>' +
                        '<p>' + _topic + '</p>' +
                        '<button type="button" class="cross_topic_btn" data-topic="' + _topic + '">' +
                            cross_svg +
                        '</button>' +
                    '</li>'
                );
            }).join('') +
    '</ul>';

    document
        .querySelector('.write-bar')
        .insertAdjacentHTML('afterbegin', new_html_selected_topics);

    let all_topics_cross_btns = document.querySelectorAll('.cross_topic_btn');
    all_topics_cross_btns.forEach(_btn => {
        _btn.onclick = () => Click_Cross_Topics(_btn);
    });
}

function Build_Topics_Suggestions(_suggestions, _prefix) {
    let html_suggestions = _suggestions
        .map(_topic => {
            let matching_txt = _topic.substr(0, _prefix.length);
            let not_matching_txt = _topic.substr(_prefix.length);

            let contains_topic = Contains_Obj(_topic, window.selected_topics);

            let svg = contains_topic
                ? '<svg viewBox="0 0 16 16" fill="var(--green)"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="var(--link-water)" ><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" style="&#10;    /* fill: aliceblue; */&#10;"/></svg>';

            let select_or_deselect = contains_topic ? 'deselect' : 'select';

            return (
                '<li class="suggestion">' +
                `<input type="button" data-topic="${_topic}">` +
                svg +
                `<p><b>${matching_txt}</b>${not_matching_txt}</p>` +
                `<div class="${select_or_deselect}"></div>` +
                '</li>'
            );
        })
        .join('');

    var suggestions_container =
        '<div class="search_suggestions_container">' +
        '<p class="short_title">Matching topics</P>' +
        html_suggestions +
        '</div>';

    window.search_suggestions.insertAdjacentHTML(
        'afterbegin',
        suggestions_container,
    );
}

function SearchSuggestions(event) {
    Clear_Suggestions();

    var searched_text = event.target.value;
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

function Suggest_Titles(prefix, max_suggestions) {
    let arr_match_titles = window.trie_articles_data.suggest(
        prefix,
        max_suggestions,
    );

    if (arr_match_titles.length > 0) {
        ShowSuggestions(arr_match_titles, prefix);
    } else {
        Build_Title_Suggestions_Not_Found();
    }

    window.search_suggestions
        .querySelectorAll('.search_suggestions_container .suggestion input')
        .forEach(input => {
            input.onclick = _e => Click_Title_Suggestion(_e);
        });
}

function ShowSuggestions(suggestions, searched_text) {
    // prettier-ignore
    var hmtl_suggestions =
        '<div class="search_suggestions_container">' +
            suggestions
                .map(title => {
                    let matching = title.substr(0, searched_text.length);
                    let not_matching = title.substr(searched_text.length);

                    return (
                        '<li class="suggestion">' +
                            '<input type="button" data-title="' + title + '">' +
                            '<p>' +
                                '<b>' + matching + '</b>' +
                                not_matching +
                            '</p>' +
                        '</li>'
                    );
                })
                .join('') +
        '</div>';

    window.search_suggestions.insertAdjacentHTML(
        'afterbegin',
        hmtl_suggestions,
    );
}

const Click_Title_Suggestion = _e => {
    Clear_Suggestions();

    let clicked_title = _e.target.getAttribute('data-title');
    window.search_bar.value = clicked_title;

    window.make_query.click();
};

export function Suggestions() {
    window.search_bar.addEventListener('input', _e => SearchSuggestions(_e));
}
