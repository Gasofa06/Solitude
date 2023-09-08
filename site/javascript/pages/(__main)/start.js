import Construct from './constructor/construct.js';
import Initialize_Events from './events.js';

export default function Initialize_Main_Page(_re = false) {
    if (_re === false) Construct();
    Initialize_Events(_re);
}
