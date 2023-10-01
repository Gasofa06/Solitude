export function Articles_Query_By_Topics() {
    let article_titles =
        window.inverted_index_topics_title.get_articles_by_topics(
            window.selected_topics,
        );

    window.page_controller.load_index_articles_page(article_titles);
}
