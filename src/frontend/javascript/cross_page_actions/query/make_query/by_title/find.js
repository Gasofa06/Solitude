/**
 * @info Busca el artículo solicitado en el resultado recibido por el servidor.
 *
 * @param {string} _plaintext_response - El resultado preprocesado de la solicitud.
 *
 * @param {string} _target_title - El título del artículo deseado por el usuario.
 *
 * @returns {string|boolean} - El contenido del artículo deseado (listo para ser
 * utilizado como modelo para construir el artículo) se proporcionará en caso de
 * encontrarse, o se devolverá `false` si no se encuentra
 */
export function Find_Requested_Article(_plaintext_response, _target_title) {
    _target_title = _target_title.toLowerCase();

    /*
     * Carácter de separación utilizado para marcar el final de un artículo.
     */
    let separation_letter = 'Ω';

    /*
     * Expresión regular para buscar el título de un artículo cualquiera.
     * Los títulos están comprendidos entre "T:" y "‽".
     *
     * ej. T:Centralización del Poder‽
     */
    let regex = /\T:(.*?)‽/;

    let arr_articles = _plaintext_response
        .split(separation_letter)
        .filter(_article => {
            let title = regex.exec(_article);

            if (!title || title.length <= 1) return false;

            if (title[1].toLowerCase() === _target_title) return true;
        });

    if (arr_articles.length === 0) {
        alert(
            'Error, there is no article with the same title as the one requested.',
        );
    }

    let article = arr_articles[0];
    return article;
}
