export class TopicsInvertedIndex {
    constructor(dict_titles, _valid_topics) {
        this.valid_topics = _valid_topics;
        this.dict_topic_titles = {};

        this.build_structure();
        this.insert_data(dict_titles);
    }

    build_structure() {
        for (let topic of this.valid_topics) {
            this.dict_topic_titles[topic] = [];
        }
    }

    add_article(_article_title, _arr_article_topics) {
        for (let article_topic of _arr_article_topics) {
            let contains_topic = !this.dict_topic_titles[article_topic];

            if (contains_topic === true) {
                // console.log(
                //     'The article is associated with a topic does not exist.',
                // );

                break;
            }

            this.dict_topic_titles[article_topic].push(_article_title);
        }
    }

    insert_data(dict_titles) {
        let idx_topics_arr = 1;

        for (let article_title in dict_titles) {
            let arr_article_topics = dict_titles[article_title][idx_topics_arr];

            if (arr_article_topics.length === 0) {
                console.log('No topics associated.');

                break;
            }

            this.add_article(article_title, arr_article_topics);
        }
    }

    get_articles_by_topics(_arr_topics) {
        let article_titles = [];

        for (let topic of _arr_topics) {
            let new_arr_titles = this.dict_topic_titles[topic] || [];

            article_titles = article_titles.concat(new_arr_titles);
        }

        console.log(
            '%c Articles Found With the Specified Topics',
            'color: orange; font-weight: bold;',
        );
        console.log({ article_titles });

        /*
                const matchingArticleIds = [
            ...articleIds.reduce(
                (acc, ids) => new Set([...acc].filter(id => ids.has(id))),
            ),
        ];
        */

        return article_titles;
    }
}
