import {
    InitEvents,
    OnScroll,
} from '/javascript/search/page-article/events.js';
import { BuildArticle } from '/javascript/search/page-article/build.js';

export function OpenArticle(article) {
    BuildArticle(article);
    InitEvents();
}

export function CloseArticle() {
    while (window.article.firstChild) {
        window.article.firstChild.remove();
    }

    window.removeEventListener('scroll', OnScroll);
}
