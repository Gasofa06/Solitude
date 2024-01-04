/**
 * @info Genera un enlace para volver arriba que puede ser utilizado en la interfaz.
 *
 * @returns {string} El fragmento de código HTML que representa el enlace para
 * volver arriba.
 */
export function Add_Back_Top() {
    // prettier-ignore
    let back_top =
        '<a class="back_to_top">' +
            '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                '<g>' +
                    '<path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>' +
                '</g>' +
            '</svg>' +
        '</a>';

    return back_top;
}
