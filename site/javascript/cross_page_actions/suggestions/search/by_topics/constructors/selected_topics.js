import { Click_Cross_Topics } from '../actions/click_topic_cross.js';

export function Show_Selected_Topics() {
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
        .querySelector('.search_bar_container')
        .insertAdjacentHTML('afterbegin', new_html_selected_topics);

    let all_topics_cross_btns = document.querySelectorAll('.cross_topic_btn');
    all_topics_cross_btns.forEach(_btn => {
        _btn.onclick = () => Click_Cross_Topics(_btn);
    });
}
