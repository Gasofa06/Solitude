import { Query } from '/app/search/cross_page_actions/query.js';
import { Suggestions } from '/app/search/cross_page_actions/suggestions.js';

export default function Initialize_Cross_Page_Events() {
    Query();
    Suggestions();
}
