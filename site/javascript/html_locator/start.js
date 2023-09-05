export default function Set_HTML_Global_Variabels() {
    window.homepage_container = document.querySelector('.homepage_container');
    window.about_container = document.querySelector('.about_container');
    window.faqs_container = document.querySelector('.faqs_container');

    let nav = document.querySelector('nav.top_bar');
    window.faqs_nav_link = nav.querySelector('ul.nav_links li.faqs a');
    window.about_nav_link = nav.querySelector('ul.nav_links li.about a');
    window.logo_nav_link = nav.querySelector('div.logo_nav_container a');
    window.search_nav_link = nav.querySelector('ul.nav_links li.search a');

    window.loading_notifier = document.getElementById('loading_text');

    window.make_query = document.getElementById('make_query_button');
    window.loading_spinner = document.getElementById('loading_spinner');

    window.search_bar = document.getElementById('search_bar_input_text');
    window.search_suggestions = document.getElementById('search_suggestions');

    window.html_selected_search_type = document.getElementById(
        'selected_search_type',
    );

    window.query_result_container = document.querySelector(
        '.query_result_container',
    );
}
