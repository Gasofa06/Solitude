import Add_Header from './header';
import Add_Main_Content from './content';
import Add_Footer from './footer';

function Build_Index_Articles_Page(_filtered_dict_topic_titles) {
    // prettier-ignore
    let index_articles =
        '<div class="articles_list_container">' +
            Add_Header(_filtered_dict_topic_titles) +
            Add_Main_Content(_filtered_dict_topic_titles) +
            Add_Footer() +
        '</div>';

    document
        .querySelector('.query_result_container')
        .insertAdjacentHTML('afterbegin', index_articles);
}

export default Build_Index_Articles_Page;
