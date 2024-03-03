let GoTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
};

// TODO
let OnClickTopic = topic => {};

let OnClickBackward = () => {
    window.page_controller.go_main_page();
};

let OnClickContentLink = section => {
    section.scrollIntoView({
        behavior: 'smooth',
    });
};

export let OnScroll = (sections, links) => {
    let current_y = window.scrollY;

    /*
     * Traverse each section of the article to determine which one
     * is in the user's view. Add the "active" class to the navigation
     * link that corresponds to the current section.
     */
    sections.forEach((sec, idx) => {
        let sec_height = sec.clientHeight;
        let sec_top = sec.offsetTop;

        if (
            current_y >= sec_top - 12 &&
            current_y < sec_top + sec_height - 12
        ) {
            links[idx - 1].classList.remove('active');
            links[idx].classList.add('active');
        }
    });
};

function InitScrollEvent() {
    let sections = window.article.querySelectorAll('[id^="section-"]');
    let links = window.article.querySelectorAll('.contents-menu a');

    if (sections.length < 1 || links.length < 1) return;

    links[0].classList.add('active');

    links.forEach((link, idx) => {
        let sec = sections[idx];

        link.addEventListener('click', () => {
            OnClickContentLink(sec);
        });
    });

    window.addEventListener('scroll', OnScroll(sections, links));
}

export function InitEvents() {
    let go_top_link = window.article.querySelector('a.back_to_top');
    let backward_link = window.article.querySelector('.backward_link');
    let topics = window.article.querySelectorAll('.topics-list .topic');

    go_top_link.addEventListener('click', () => {
        GoTop();
    });

    backward_link.addEventListener('click', () => {
        OnClickBackward();
    });

    topics.forEach(topic => {
        let topic_name = topic.getAttribute('topic');

        topic.addEventListener('click', () => {
            OnClickTopic(topic_name);
        });
    });

    InitScrollEvent();
}
