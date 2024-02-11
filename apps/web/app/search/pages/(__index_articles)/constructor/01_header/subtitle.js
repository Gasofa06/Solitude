export function Add_Subtitle() {
    let num_articles_founded = window.article_titles_list.length;

    if (num_articles_founded === 0) {
        var subtitle =
            '<div class="subtitle_container">' +
            '<p>No articles found.</p>' +
            '</div>';
    } else {
        var subtitle =
            '<div class="subtitle_container">' +
            '<p>Explore the</p>' +
            `<label>${num_articles_founded}</label>` +
            '<p>articles that matches with your searched topics.</p>' +
            '</div>';
    }

    return subtitle;
}
