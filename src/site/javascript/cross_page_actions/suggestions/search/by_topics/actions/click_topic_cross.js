import { Show_Selected_Topics } from '../constructors/selected_topics.js';

export const Click_Cross_Topics = _btn => {
    let topic = _btn.getAttribute('data-topic');

    window.selected_topics = window.selected_topics.filter(_t => _t != topic);
    // console.log(topic + " have been eliminated.")

    window.search_bar.select();
    Show_Selected_Topics();
};
