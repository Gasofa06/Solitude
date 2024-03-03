export default function Set_HTML_Global_Variabels() {
    window.make_query = document.getElementById('make-query');
    window.search_bar = document.querySelector('.write-bar input');
    window.search_suggestions = document.getElementById(
        'search-suggestions-list',
    );

    window.html_selected_search_type = document.querySelector(
        '#selected-search-type p',
    );

    window.query_result_container = document.getElementById(
        'section-query-result',
    );
}
