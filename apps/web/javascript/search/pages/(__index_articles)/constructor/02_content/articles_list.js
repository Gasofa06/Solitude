import { MAX_ARTICELS_IN_PAGE } from '../../../../../constants.js';

export function Add_Articles_List() {
    var arr_articles_list_content = [];

    let curr_page = window.curr_page_in_index_articles;

    for (
        var curr_idx = MAX_ARTICELS_IN_PAGE * curr_page;
        curr_idx <= MAX_ARTICELS_IN_PAGE * (curr_page + 1);
        curr_idx++
    ) {
        if (curr_idx >= window.article_titles_list.length) {
            break;
        }

        let article_title = window.article_titles_list[curr_idx];
        let html_title = `<h6>${article_title}</h6>`;

        let arr_article_topics =
            window.trie_articles_data.get_topics(article_title);

        let html_topics =
            '<div class="topics">' +
            arr_article_topics.map(_topic => {
                return `<a>${_topic}</a>`;
            }) +
            '</div>';

        let article_release_date =
            window.trie_articles_data.get_release_date(article_title);

        let html_date = `<a class="date">${article_release_date}</a>`;

        let article_box =
            '<li>' +
            html_title +
            '<div class="date_and_topics">' +
            html_date +
            '<p class="separator">—</p>' +
            html_topics +
            '</div>' +
            '</li>';

        console.log(article_box);

        arr_articles_list_content.push(article_box);

        console.log(arr_articles_list_content);
    }

    console.log(arr_articles_list_content);
    let articles_list_content = arr_articles_list_content.join('');

    return `<ul class="articles_list">${articles_list_content}</ul>`;
}
