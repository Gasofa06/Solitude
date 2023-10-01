/**
 * @info Devuelve el título del artículo en formato HTML.
 *
 * @param {string} _article_information - Texto que incluye datos acerca
 * del artículo, entre ellos su título.
 *
 * @return {string} - Cadena de texto que contiene el contenido HTML del
 * título del artículo.
 */
export function Add_Title(_article_information) {
    /*
     * Obtenemos el titulo del artículo.
     *
     * Este se encuentra entre "T:" y "‽".
     *
     * ej. T:Centralización del Poder‽
     */
    let regex = /\T:(.*?)‽/;
    let match = regex.exec(_article_information);

    if (match && match.length > 1) {
        var title = match[1];
    }

    if (!title) return '';

    return '<h2 class="title">' + title + '</h2>';
}
