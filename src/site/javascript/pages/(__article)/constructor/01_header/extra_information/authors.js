/**
 * @info Agrega los autores del artículo al contenido HTML.
 *
 * @param {string} _article_information - Texto que contiene los autores del artículo.
 *
 * @return {string} - Cadena de texto que contiene el contenido HTML de los
 * autores del artículo.
 */
export function Get_Authors(_article_information) {
    /*
     * Obtenemos los autores del articulo.
     *
     * Los autores se encuentra entre "A:" y "‽"; y, todos ellos, están separados por "&".
     *
     * Ej. A:Roger Rovira&Peter Parker&Ai Haibara‽
     */
    let regex = /\A:(.*?)‽/;
    let match = regex.exec(_article_information);

    if (match && match.length > 1) {
        var arr_authors = match[1];

        arr_authors = arr_authors.split('&');
    }

    if (!arr_authors) return '';

    let authors = arr_authors
        .map(_author => {
            return '<span>' + _author + '</span>';
        })
        .join(' & ');

    let html_authors = '<p class="authors">' + `By ${authors}` + '</p>';

    return html_authors;
}
