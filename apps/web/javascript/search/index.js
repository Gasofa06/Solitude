import { InitQuery } from '/javascript/search/query.js';
import { InitSuggestions } from '/javascript/search/suggestions.js';

import {
    OpenArticle,
    CloseArticle,
} from '/javascript/search/page-article/index.js';

import {
    OpenMainPage,
    CloseMainPage,
} from '/javascript/search/page-search/index.js';

import Initialize_Index_Articles_Page from '/javascript/search/pages/(__index_articles)/__initialize.js';

function Search() {
    InitQuery();
    InitSuggestions();
}

function Set_HTML_Global_Variabels() {
    window.make_query = document.getElementById('make-query');
    window.search_bar = document.querySelector('.write-bar input');
    window.search_suggestions = document.getElementById(
        'search-suggestions-list',
    );

    window.html_selected_search_type = document.querySelector(
        '#selected-search-type p',
    );

    window.article = document.getElementById('section-article');
}

export class PageController {
    constructor() {
        window.homepage_container = document.querySelector('#section-search');

        this.MAIN = 'main';
        this.ARTICLE = 'article';

        this.curr_page = 'main';

        document.body.scrollIntoView({ behavior: 'smooth' });

        Set_HTML_Global_Variabels();
        OpenMainPage();
        Search();
    }

    close_page(page) {
        switch (true) {
            case page === this.MAIN:
                CloseMainPage();
                break;

            case page === this.ARTICLE:
                CloseArticle();
                break;
        }
    }

    go_main_page() {
        let previous_page = this.curr_page;

        this.curr_page = this.MAIN;
        this.close_page(previous_page);

        window.homepage_container.classList.remove('disactive');

        document.body.scrollIntoView({ behavior: 'smooth' });

        OpenMainPage(true);
    }

    go_article_page(_article) {
        let previous_page = this.curr_page;

        this.curr_page = this.ARTICLE;
        this.close_page(previous_page);

        document.body.scrollIntoView({ behavior: 'smooth' });

        OpenArticle(_article);
    }

    load_index_articles_page(_article_titles) {
        let previous_page = this.curr_page;

        this.curr_page = this.INDEX_ARTICLES;
        this.close_page(previous_page);

        document.body.scrollIntoView({ behavior: 'smooth' });

        Initialize_Index_Articles_Page(_article_titles);
    }

    get_curr_page() {
        return this.curr_page;
    }

    in_article_page() {
        let response = this.curr_page === this.ARTICLE ? true : false;
        return response;
    }
}
