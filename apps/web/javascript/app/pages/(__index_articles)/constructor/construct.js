import { Build_Header } from './01_header/__header.js';
import { Build_Content } from './02_content/__content.js';
import { Build_Footer } from './03_footer/__footer.js';

function Construct_Index_Articles_Page() {
    let index_articles =
        '<div class="articles_list_container">' +
        Build_Header() +
        Build_Content() +
        Build_Footer() +
        '</div>';

    document
        .querySelector('.query_result_container')
        .insertAdjacentHTML('afterbegin', index_articles);
}

export default Construct_Index_Articles_Page;
