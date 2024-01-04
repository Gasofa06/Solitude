import {
    Clear_Suggestions,
    Clear_Search_Text_Input,
} from '../../../../../../utils/clear.js';

import { Contains_Obj } from '../../../../../../utils/obj_handle.js';

import { Show_Selected_Topics } from '../constructors/selected_topics.js';

export const Click_Topic_Suggestion = _e => {
    Clear_Suggestions();
    Clear_Search_Text_Input();

    window.search_bar.select();

    let clicked_topic = _e.target.getAttribute('data-topic');

    let contains_obj = Contains_Obj(clicked_topic, window.selected_topics);

    if (!contains_obj) {
        window.selected_topics.push(clicked_topic);
        // console.log(clicked_topic + " have been added.")
    } else {
        window.selected_topics = window.selected_topics.filter(
            _topic => _topic != clicked_topic,
        );
        // console.log(clicked_topic + " have been eliminated.")
    }

    Show_Selected_Topics();
};
