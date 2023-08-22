let curr_page = 0;
let max_articles_for_page = 20;

function Add_Main_Content(_filtered_dict_topic_titles) {
    let arr_articles_titles = Object.values(_filtered_dict_topic_titles);
    let arr_articles_list_content = [];

    for (var _idx of [...Array(max_articles_for_page).keys()]) {
        _idx = _idx + max_articles_for_page * curr_page;

        if (arr_articles_titles.length > _idx) {
            let title = arr_articles_titles[_idx];
            let arr_topics = window.dict_title_topics[title];

            let html_topics =
                '<div class="topics">' +
                arr_topics.map(_topic => {
                    return `<a>${_topic}</a>`;
                }) +
                '</div>';

            let html_list_content =
                '<li>' +
                `<h6>${title}</h6>` +
                '<div class="date_and_topics">' +
                '<a class="date">November 15, 2022</a>' +
                '<p class="separator">—</p>' +
                html_topics +
                '</div>' +
                '</li>';

            arr_articles_list_content.push(html_list_content);
        }
    }

    let circle_intersectio_svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">' +
        '<circle cx="13.5" cy="10.5" r="5" />' +
        '<circle cx="7.5" cy="10.5" r="5" />' +
        '</svg>';

    let dropdown_arrow_svg =
        '<svg xmlns:xlink="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
        '<path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" />' +
        '</svg>';

    var hmtl_suggestions =
        '<div class="content">' +
        '<div class="filter_bar">' +
        `<button class="filter">${dropdown_arrow_svg}</button>` +
        `<button class="intersection">${circle_intersectio_svg}</button>` +
        '</div>' +
        `<ul class="articles_list">${arr_articles_list_content.join('')}</ul>` +
        '</div>';

    return hmtl_suggestions;
}

export default Add_Main_Content;
