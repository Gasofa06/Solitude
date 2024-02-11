import { Get_Data } from '../services/get.js';

import { Decompress_JSON_File } from './__decompress__/decomp_json.js';

import { ArticlesTrie } from './data_structures/articles_trie.js';
import { TopicsInvertedIndex } from './data_structures/inverted_index.js';

async function Setup_Data() {
    let get_topics = Get_Data('api/topics.json', true);

    let bz2_main_dict = await Get_Data('api/title_and_topics.json', true);
    let obj_main_dict = Decompress_JSON_File(bz2_main_dict['bz2']);
    // let obj_main_dict = bz2_main_dict;
    console.log(obj_main_dict);
    window.trie_articles_data = new ArticlesTrie(obj_main_dict);

    let topics = await get_topics;

    window.inverted_index_topics_title = new TopicsInvertedIndex(
        obj_main_dict,
        topics,
    );

    console.log(
        '%c All Articles Information We Get From Server',
        'color: orange; font-weight: bold;',
    );
    console.log({ topics });
    console.log({ obj_main_dict });

    console.log(
        '%c Titles Stored With a Prfix Trie Structure',
        'color: orange; font-weight: bold;',
    );
    console.log(window.trie_articles_data);

    console.log(
        '%c Titles Stored by Topics',
        'color: orange; font-weight: bold;',
    );
    console.log(window.inverted_index_topics_title);
}

export default Setup_Data;
