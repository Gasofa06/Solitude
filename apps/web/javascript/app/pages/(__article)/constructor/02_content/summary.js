/**
 * @info Genera y devuelve el resumen del artículo.
 *
 * @param {string} _body_article - Texto que contiene el resumen
 * del artículo.
 *
 * @returns {string} - Texto, en formato HTML, del resumen.
 */
export function Build_Summary(_body_article) {
    /*
     * Obtenemos el resumen del artículo.
     *
     * El resumen debe estar entre "Ϡ:" y "‽".
     *
     * ej. Ϡ:En la era en la que nos enc...‽
     */
    let regex = /\Ϡ:(.*?)‽/;
    let match = regex.exec(_body_article);

    if (match && match.length > 1) {
        var sum_content = match[1];
    } else {
        return '';
    }

    let sum_id = window.identifier_coordinator.generate_section_id('Summary');

    let sum =
        `<summary id="${sum_id}">` +
        '<p class="title">Summary</p>' +
        `<p>${sum_content}</p>` +
        '</summary>';

    return sum;
}
