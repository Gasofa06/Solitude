/**
 * @info Construye una cita en formato HTML.
 *
 * @param {string} _quote_txt - Texto
 * citado acompañado por, si se desea,
 * el nombre del autor. La estructura
 * constará invariablemente de la cita
 * en primer término, seguida en segundo
 * lugar por el nombre del autor, en
 * caso de haberlo. Estos dos componentes
 * deberán estar divididos por '•'.
 *
 * Ej. "Elemental, mi querido Watson•Sherlock Holmes".
 *
 * @returns {string} - El contenido
 * HTML de la cita.
 */
export function Build_Quote(_quote_txt) {
    let arr_quote = _quote_txt.split('•');

    if (arr_quote.length > 1) {
        let author = arr_quote[1];

        var html_author_quote =
            '<p class="author">' + '<b>— ' + author + '</b>' + '</p>';
    } else {
        var html_author_quote = '';
    }

    let quote = arr_quote[0];
    let html_quote = '<p class="quote">' + '<b>' + quote + '</b>' + '</p>';

    let blockquote =
        '<blockquote>' + html_quote + html_author_quote + '</blockquote>';

    return blockquote;
}
