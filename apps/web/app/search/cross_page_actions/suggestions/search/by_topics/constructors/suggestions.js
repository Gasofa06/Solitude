import { Contains_Obj } from '../../../../../../utils/obj_handle.js';

export function Build_Topics_Suggestions(_suggestions, _prefix) {
    let html_suggestions = _suggestions
        .map(_topic => {
            let matching_txt = _topic.substr(0, _prefix.length);
            let not_matching_txt = _topic.substr(_prefix.length);

            let contains_topic = Contains_Obj(_topic, window.selected_topics);

            let svg = contains_topic
                ? '<svg viewBox="0 0 16 16" fill="var(--c-primary-100)"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="var(--c-secondary-050)" ><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" style="&#10;    /* fill: aliceblue; */&#10;"/></svg>';

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
