import { Get_Data } from '../server_interaction/get_data.js';

import { ArticlesTrie } from './data_structures/articles_trie.js';
import { NestedHierarchicalTree } from './data_structures/hierarchical.js';

async function Setup_Data() {
    let get_topics = Get_Data('data/topics.json', true);

    let bz2_main_dict = await Get_Data('data/main_dict.json', true);
    // let obj_main_dict = Decompress_JSON_File(bz2_main_dict['bz2']);
    let obj_main_dict = bz2_main_dict;

    window.trie_articles_data = new ArticlesTrie(obj_main_dict);

    let topics = await get_topics;
    let max_article_topics = 5;

    window.tree_topics_data = new NestedHierarchicalTree(
        obj_main_dict,
        topics,
        max_article_topics,
    );

    console.log(window.tree_topics_data.search_articles(['Politics'], true));
}

export default Setup_Data;
