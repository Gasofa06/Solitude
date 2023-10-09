import { Toggle_Theme } from './top_bar/toggle_theme.js';

import { Click_Navbar_Search } from './top_bar/links/search.js';
import { Click_Navbar_About } from './top_bar/links/about.js';
import { Click_Navbar_FAQs } from './top_bar/links/faqs.js';
import { Click_Navbar_Logo } from './top_bar/links/logo.js';

export function Initialize_Navigation_Events() {
    document.getElementById('switch_theme_toggle').onclick = () => {
        Toggle_Theme();
    };

    window.search_nav_link.onclick = _e => Click_Navbar_Search(_e);
    window.about_nav_link.onclick = _e => Click_Navbar_About(_e);
    window.faqs_nav_link.onclick = _e => Click_Navbar_FAQs(_e);
    window.logo_nav_link.onclick = _e => Click_Navbar_Logo(_e);
}
