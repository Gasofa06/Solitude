/**
 * @info En localStorage, solo se almacenan textos. Para guardar datos
 * binarios, como ArrayBuffer, conviene convertirlos al formato Base64.
 * La función siguiente convierte un ArrayBuffer en cadena Base64.
 *
 * @param {ArrayBuffer} _data - El ArrayBuffer que se va a convertir en
 * formato Base64.
 *
 * @return {string} Una cadena que representa el contenido del ArrayBuffer
 * en formato Base64.
 */
export async function ArrayBuffer_To_Base64(_data) {
    let base64_url = await new Promise(r => {
        let reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.readAsDataURL(new Blob([_data]));
    });

    return base64_url.split(',', 2)[1];
}

/**
 * @info En localStorage, solo se almacenan textos. Para guardar datos
 * binarios, como ArrayBuffer, conviene convertirlos al formato Base64.
 * La función siguiente convierte un Base64, que anterirómente fue una
 * ArrayBuffer pero fue convertida a Base64 para poder almacenarse, en
 * una ArrayBuffer.
 *
 * @param {string} data - El Base64 que se va a convertir en ArrayBuffer.
 *
 * @return {ArrayBuffer} El ArrayBuffer.
 */
export function Base64_To_ArrayBuffer(_str) {
    return Uint8Array.from(atob(_str), c => c.charCodeAt(0));
}
