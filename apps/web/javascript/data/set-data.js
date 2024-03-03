import '../utils/bz2.js';
import { GetData } from '../services/api.js';

import { ArticlesTrie } from './structures/articles-trie.js';
import { TopicsInvertedIndex } from './structures/inverted-index.js';

function Decompress(compressed_str) {
    let decoded_str = atob(compressed_str);

    let char_num_arr = decoded_str.split('').map(_x => {
        return _x.charCodeAt(0);
    });
    let byte_arr = new Uint8Array(char_num_arr);

    let decompressed_str = bz2.decompress(byte_arr);
    let decoded_decompressed_str = new TextDecoder('utf-8').decode(
        decompressed_str,
    );

    return JSON.parse(decoded_decompressed_str);
}

export async function SetData() {
    let get_topics = GetData('api/topics.json', true);

    let bz2_main_dict = await GetData('api/main-dict.json', true);
    let obj_main_dict = Decompress(bz2_main_dict['bz2']);

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
