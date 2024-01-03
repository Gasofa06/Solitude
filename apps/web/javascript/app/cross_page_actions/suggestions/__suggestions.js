import { Search_Suggestions_Manager } from './search/manager.js';

export function Initialize_Suggestions_Events() {
    window.search_bar.addEventListener('input', _e =>
        Search_Suggestions_Manager(_e),
    );
}
