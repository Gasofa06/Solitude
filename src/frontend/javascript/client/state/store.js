import { KEY_NAME } from '../../__constants__/__constants.js';
import { ArrayBuffer_To_Base64 } from '../__helpers__/converter.js';

/**
 * @info Aalmacena el estado del cliente en el almacenamiento local del
 * navegador. El estado incluye la clave del cliente convertida en formato
 * Base64, el identificador único del cliente y la marca de tiempo de creación.
 *
 * @param {ArrayBuffer} _key - La clave en formato ArrayBuffer que se va a almacenar.
 * @param {string} _uuid - El identificador único del cliente que se va a almacenar.
 */
export async function Store_State(_key, _uuid) {
    let state = {
        key: await ArrayBuffer_To_Base64(_key),
        uuid: _uuid,
        created_at: Date.now(),
    };

    window.localStorage[KEY_NAME] = JSON.stringify(state);
}
