import { Back_Top } from './actions/back_top.js';
import { Click_Topic } from './actions/topic.js';
import { Click_Backward } from './actions/backward.js';
import { Article_Scroll } from './actions/scroll.js';

function Initialize_Events() {
    window.query_result_container
        .querySelector('a.back_to_top')
        .addEventListener('click', () => {
            Back_Top();
        });

    window.query_result_container
        .querySelector('.backward_link')
        .addEventListener('click', () => {
            Click_Backward();
        });

    window.query_result_container
        .querySelectorAll('ul.topics li.topic')
        .forEach(_li => {
            let topic = _li.getAttribute('data-topic');

            _li.addEventListener('click', () => {
                Click_Topic(topic);
            });
        });

    (function Init_Scroll_Event() {
        let article_container =
            window.query_result_container.querySelector('article');

        window.aricle_sections =
            article_container.querySelectorAll('[id^="section-"]');

        window.table_contents_links = article_container.querySelectorAll(
            'nav.table_contents a',
        );

        window.table_contents_links[0].classList.add('active');

        window.table_contents_links.forEach((_link, _idx) => {
            _link.addEventListener('click', () => {
                window.aricle_sections[_idx].scrollIntoView({
                    behavior: 'smooth',
                });
            });
        });

        window.addEventListener('scroll', Article_Scroll);
    })();
}

export default Initialize_Events;
