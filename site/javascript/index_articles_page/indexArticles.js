function Build_Index_Articles_Page(_filtered_dict_topic_titles) {
    // prettier-ignore
    let index_articles =
        '<div class="articles_list_container">' +
            Add_Header(_filtered_dict_topic_titles) +
            Add_Articles_List(_filtered_dict_topic_titles) +
        '</div>';

    document
        .querySelector('.query_result_container')
        .insertAdjacentHTML('afterbegin', index_articles);
}

function Add_Header(_filtered_dict_topic_titles) {
    let articles_founded = 0;
    let o = Object.values(_filtered_dict_topic_titles);
    for (var _arr_articles of o) {
        articles_founded += _arr_articles.length;
    }

    let arr_selected_topics = Object.keys(_filtered_dict_topic_titles);
    let arr_html_selected_topics = arr_selected_topics.map(_topic => {
        // prettier-ignore
        let content =
            '<li>' +
                `<p>${_topic}</p>` +

                `<button class="cross_topic_btn" data-topic="${_topic}">` +
                    '<svg viewBox="0 0 24 24">' + 
                        '<path d="M20 20L4 4.00003M20 4L4.00002 20"/>' + 
                    '</svg>' +
                '</button>' +
            '</li>';

        return content;
    });

    // prettier-ignore
    let header =
        '<header>' +
            '<h2>Articles</h2>' +

            '<div class="subtitle_container">' +
                '<p>Explore the</p>' +
                `<label>${articles_founded}</label>` +
                '<p>articles that matches with your searched topics.</p>' +
            '</div>' +

            '<div class="topics_container">' +
                '<ul class="selected_topics_container">' +
                    arr_html_selected_topics.join("") +
                '</ul>' +
            '</div>' +
        '</header>';

    return header;
}

function Add_Articles_List(_filtered_dict_topic_titles) {
    //let

    // prettier-ignore
    var hmtl_suggestions =
        '<div class="content">' +
            '<div class="filter_bar">' +
                '<button class="filter"></button>' +
            '</div>' +
            
            '<ul class="articles_list">' +
                '<li>' +
                '<h6>Centralización del Poder</h6>' +
                '<div class="date_and_topics">' +
                '<a class="date">November 15, 2022</a>' +
                '<p class="separator">—</p>' +
                '<a class="topics"> Technology </a>' +
                '</div>' +
                '</li>' +
            '</ul>' +
        '</div>';
}
