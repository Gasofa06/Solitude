import { Add_Title } from './title.js';
import { Add_Subtitle } from './subtitle.js';
import { Add_Select_Topics_Bar } from './select_topics_bar.js';

export function Build_Header() {
    let header =
        '<header>' +
        Add_Title() +
        Add_Subtitle() +
        Add_Select_Topics_Bar() +
        '</header>';

    return header;
}
