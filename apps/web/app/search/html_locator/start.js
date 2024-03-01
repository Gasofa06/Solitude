export default function Set_HTML_Global_Variabels() {
    window.homepage_container = document.querySelector('#section-search');
    window.about_container = document.querySelector('.about_container');
    window.faqs_container = document.querySelector('.faqs_container');

    window.make_query = document.getElementById('make_query_button');
    window.loading_spinner = document.getElementById('loading_spinner');

    window.search_bar = document.getElementById('search_bar_input_text');
    window.search_suggestions = document.getElementById(
        'search-suggestions-list',
    );

    window.html_selected_search_type = document.querySelector(
        '#selected-search-type p',
    );

    window.query_result_container = document.querySelector(
        '.query_result_container',
    );
}
