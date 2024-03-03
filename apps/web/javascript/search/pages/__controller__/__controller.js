import Initialize_Main_Page from '../(__main)/start.js';
import { Main_Page_Click } from '../(__main)/actions/main_page_lick.js';

import Initialize_Article_Page from '../(__article)/start.js';
import { Article_Scroll } from '../(__article)/actions/scroll.js';

import Initialize_Index_Articles_Page from '../(__index_articles)/__initialize.js';

import Set_HTML_Global_Variabels from '../../html_locator/start.js';
import Initialize_Cross_Page_Events from '../../cross_page_actions/start.js';

export class PageController {
    constructor() {
        window.homepage_container = document.querySelector('#section-search');

        this.MAIN = 'main';
        this.ARTICLE = 'article';

        this.curr_page = 'main';

        document.body.scrollIntoView({ behavior: 'smooth' });

        Set_HTML_Global_Variabels();
        Initialize_Main_Page();
        Initialize_Cross_Page_Events();
    }

    close_page(_page) {
        switch (true) {
            case _page === this.MAIN:
                window.homepage_container.classList.add('disactive');
                window.removeEventListener('click', Main_Page_Click);

                break;

            case _page === this.ARTICLE:
                window.aricle_sections = null;
                window.table_contents_links = null;

                let article =
                    window.query_result_container.querySelector('article');
                if (!!article) {
                    article.remove();
                }

                window.removeEventListener('scroll', Article_Scroll);

                break;
        }
    }

    go_main_page() {
        let previous_page = this.curr_page;

        this.curr_page = this.MAIN;
        this.close_page(previous_page);

        window.homepage_container.classList.remove('disactive');

        document.body.scrollIntoView({ behavior: 'smooth' });

        Initialize_Main_Page(true);
    }

    go_article_page(_article) {
        let previous_page = this.curr_page;

        this.curr_page = this.ARTICLE;
        this.close_page(previous_page);

        document.body.scrollIntoView({ behavior: 'smooth' });

        Initialize_Article_Page(_article);
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
