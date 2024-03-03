import { BuildSearch } from '/javascript/search/page-search/build.js';
import {
    InitEvents,
    Main_Page_Click,
} from '/javascript/search/page-search/events.js';

let search_types = {
    Title: {
        placeholder: 'Search article by title (e.g. Conan Edogawa)',
    },

    Topic: {
        placeholder: 'Search posts by topic (e.g. Anime; Music;)',
    },

    'Ref.': {
        placeholder: 'Search article by reference (e.g. 286)',
    },
};

export function OpenMainPage(_re = false) {
    if (_re === false) BuildSearch(search_types);
    InitEvents(_re, search_types);
}

export function CloseMainPage() {
    window.homepage_container.classList.add('disactive');
    window.removeEventListener('click', Main_Page_Click);
}
