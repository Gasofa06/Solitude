/**
 * @info Agrega la fecha de publicación del artículo al contenido HTML.
 *
 * @param {string} _article_information - Texto que contiene la fecha del artículo.
 *
 * @return {string} - Cadena de texto que contiene el contenido HTML de la fecha
 * de publicación del artículo.
 */
export function Get_Release_Date(_article_information) {
    /*
     * Array que guarda la fecha del artículo.
     *
     * Dicha fecha está comprendida entre "ϝ:" y "‽"; y el mes y el año estan
     * separados por "-".
     *
     * Ej. ϝ:11-2023‽
     */
    let regex = /\ϝ:(.*?)‽/;
    let match = regex.exec(_article_information);

    if (match && match.length > 1) {
        var arr_date = match[1];

        arr_date = arr_date.split('-');
    }

    if (!arr_date && arr_date.length < 2) return '';

    let arr_months = [
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

    let month_num = arr_date[0];

    if (month_num > 13 || month_num < 1) return '';

    let month_name = arr_months[month_num - 1];
    let year = arr_date[1];

    let release_date =
        '<p class="release_date">' + month_name + ' ' + year + '</p>';

    return release_date;
}
