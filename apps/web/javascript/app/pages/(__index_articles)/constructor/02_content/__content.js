import { Add_Articles_List } from './articles_list.js';
import { Add_Filter_Bar } from './filter_bar.js';

export function Build_Content() {
    var article_indexs_content =
        '<div class="content">' +
        Add_Filter_Bar() +
        Add_Articles_List() +
        '</div>';

    return article_indexs_content;
}
