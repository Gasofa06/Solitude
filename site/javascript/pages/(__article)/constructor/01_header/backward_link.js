/**
 * @info Genera un enlace hacia atrás que puede ser utilizado en la interfaz.
 *
 * @returns {string} El fragmento de código HTML que representa el enlace de regreso.
 */
export function Add_Backward_Link() {
    // prettier-ignore
    let html_backward_link =
        '<a class="backward_link">' +
            
            'Return to Homepage' +
            
            '<svg class="arrow_icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                '<g>' +
                    '<circle></circle>' +
                    '<path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>' +
                '</g>' +
            '</svg>' +
            
        '</a>';

    return html_backward_link;
}
