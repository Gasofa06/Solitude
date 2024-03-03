function AddTopics(info) {
    // C:Technology&Politics&Monopolization‽

    let regex = /\C:(.*?)‽/;
    let match = regex.exec(info);

    if (match && match.length > 1) {
        var arr_topics = match[1];
        arr_topics = arr_topics.split('&');
    } else return '';

    let topics = arr_topics
        .map(topic => {
            let txt =
                `<li class="topic" topic=${topic}>` +
                `<p>${topic}</p>` +
                '</li>';

            return txt;
        })
        .join('');

    topics = `<ul class="topics-list">${topics}</ul>`;
    return topics;
}

function AddTitle(info) {
    // T:Centralización del Poder‽

    let regex = /\T:(.*?)‽/;
    let match = regex.exec(info);

    if (match && match.length > 1) {
        var title = match[1];
    } else return '';

    if (!title) return '';
    else return '<h2>' + title + '</h2>';
}

function AddSummary(info) {
    // Ϡ:En la era en la que nos enc...‽
    let regex = /\Ϡ:(.*?)‽/;
    let match = regex.exec(info);

    if (match && match.length > 1) {
        var summary_content = match[1];
    } else return '';

    let summary =
        `<summary>` +
        '<span>Summary</span>' +
        `<p>${summary_content}</p>` +
        '</summary>';

    return summary;
}

let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function AddDate(info) {
    // ϝ:11-2023‽
    let regex = /\ϝ:(.*?)‽/;
    let match = regex.exec(info);

    if (match && match.length > 1) {
        var arr_date = match[1];
        arr_date = arr_date.split('-');
    } else return;

    if (!arr_date && arr_date.length < 2) return;

    let month_num = arr_date[0];
    if (month_num > 13 || month_num < 1) return;

    let month_name = months[month_num - 1];
    let year = arr_date[1];

    let date = '<p class="date">' + month_name + ' ' + year + '</p>';
    return date;
}

function AddAuthors(info) {
    // A:Roger Rovira&Peter Parker&Ai Haibara‽
    let regex = /\A:(.*?)‽/;
    let match = regex.exec(info);

    if (match && match.length > 1) {
        var arr_authors = match[1];
        arr_authors = arr_authors.split('&');
    } else return;

    let authors =
        arr_authors.slice(0, -1).join(', ') + ' and ' + arr_authors.slice(-1);

    authors = '<p class="authors">' + authors + '</p>';

    return authors;
}

function AddArticleInfo(info) {
    //prettier-ignore
    let article_info =
        '<div class="article-information">' +
            AddTitle(info) +
            AddSummary(info) +
            '<div>' +
                AddDate(info) +
                AddAuthors(info) +
            '</div>' +
        '</div>';

    return article_info;
}

export function Header(info) {
    let id = window.identifier_coordinator.generate_section_id('header');

    let header =
        `<header id="${id}">` +
        AddTopics(info) +
        AddArticleInfo(info) +
        '</header>';

    return header;
}
