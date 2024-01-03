export function Add_Select_Topics_Bar() {
    let selected_topics = window.selected_topics
        .map(_topic => {
            let cross_btn =
                `<button class="cross_topic_btn" data-topic="${_topic}">` +
                '<svg viewBox="0 0 24 24">' +
                '<path d="M20 20L4 4.00003M20 4L4.00002 20"/>' +
                '</svg>' +
                '</button>';

            let selected_topic_box =
                '<li>' + `<p>${_topic}</p>` + cross_btn + '</li>';

            return selected_topic_box;
        })
        .join('');

    let topics_bar =
        '<div class="topics_container">' +
        '<ul class="selected_topics_container">' +
        selected_topics +
        '</ul>' +
        '</div>';

    return topics_bar;
}
