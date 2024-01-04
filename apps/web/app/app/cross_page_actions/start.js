import { Initialize_Navigation_Events } from './navigation/__navigation.js';
import { Initialize_Query_Events } from './query/__query.js';
import { Initialize_Suggestions_Events } from './suggestions/__suggestions.js';

export default function Initialize_Cross_Page_Events() {
    Initialize_Navigation_Events();

    Initialize_Query_Events();

    Initialize_Suggestions_Events();
}
