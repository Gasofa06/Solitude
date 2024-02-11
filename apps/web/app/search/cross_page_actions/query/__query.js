import { Make_Query_Manager } from './make_query/manager.js';

export function Initialize_Query_Events() {
    window.make_query.onclick = () => Make_Query_Manager();
}
