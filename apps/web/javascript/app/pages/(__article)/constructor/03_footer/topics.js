/**
 * @info Devuelve las categorias del artículo en formato HTML.
 *
 * @param {string} _article_information - Texto que contiene los temas del artículo.
 *
 * @return {string} Cadena de texto que contiene el contenido HTML con los
 * temas del artículo.
 */
export function Add_Topics(_article_information) {
    /*
     * Obtenemos los temas del artículo.
     *
     * Estos deben encuentrase entre "C:" y "‽"; y estar separados por "&".
     *
     * ej. C:Technology&Politics&Monopolization‽
     */
    let regex = /\C:(.*?)‽/;
    let match = regex.exec(_article_information);

    if (match && match.length > 1) {
        var arr_topics = match[1];

        arr_topics = arr_topics.split('&');
    }

    let topics = arr_topics
        .map(_topic => {
            let html_topic =
                `<li class="topic" data-topic=${_topic}>` +
                `<p>${_topic}</p>` +
                '</li>';

            return html_topic;
        })
        .join('');

    let html_topics = `<ul class="topics">${topics}</ul>`;

    return html_topics;
}
