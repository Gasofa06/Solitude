import { Set_Search_Type } from './actions/set_search_type.js';
import { Main_Page_Click } from './actions/main_page_lick.js';

export default function Initialize_Events(_re) {
    if (_re === false) {
        window.arr_search_types_inputs.forEach(_input => {
            _input.onclick = _e => {
                let type = _e.target.value;

                Set_Search_Type(type);
            };
        });
    }

    window.addEventListener('click', Main_Page_Click);
}
