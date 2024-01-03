import Construct from './constructor/construct.js';
import Initialize_Events from './events.js';

export default function Initialize_Article_Page(_article) {
    Construct(_article);
    Initialize_Events();
}
