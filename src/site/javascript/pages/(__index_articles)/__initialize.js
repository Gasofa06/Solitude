import Construct_Index_Articles_Page from './constructor/construct.js';
import Initialize_Events from './events.js';

function Initialize_Index_Articles_Page(_article_titles) {
    window.curr_page_in_index_articles = 0;
    window.article_titles_list = _article_titles;

    Construct_Index_Articles_Page();
    Initialize_Events();
}

export default Initialize_Index_Articles_Page;
