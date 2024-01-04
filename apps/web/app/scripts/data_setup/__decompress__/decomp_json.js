import '../../../platform_utils/decompression/bz2.js';

/**
 * @info Descomprime una cadena de texto codificada y la convierte en un
 * objeto JSON.
 *
 * @param {string} _compressed_str - La cadena de texto comprimida que se
 * va a descomprimir.
 *
 * @return {Object} Un objeto JSON obtenido después de decodificar y
 * descomprimir la cadena de entrada.
 */
export function Decompress_JSON_File(_compressed_str) {
    let decoded_compressed_str = atob(_compressed_str);

    let char_num_arr = decoded_compressed_str.split('').map(_x => {
        return _x.charCodeAt(0);
    });
    let byte_arr = new Uint8Array(char_num_arr);

    let decompressed_str = bz2.decompress(byte_arr);
    let decoded_decompressed_str = new TextDecoder('utf-8').decode(
        decompressed_str,
    );

    let obj = JSON.parse(decoded_decompressed_str);

    return obj;
}
