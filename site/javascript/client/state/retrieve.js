import { KEY_NAME } from '../../__constants__/__constants.js';
import { Base64_To_ArrayBuffer } from '../__helpers__/converter.js';

/**
 * @info Recupera la configuración del usuario, si existe.
 *
 * @return {boolean|Object} Devuelve false si no se ha inicializado
 * ningun usuario y un Object con la configuración si se ha inicializado.
 */
export function Retrieve_Client_State() {
    if (!window.localStorage || !window.localStorage[KEY_NAME]) {
        return false;
    }

    let state = JSON.parse(window.localStorage[KEY_NAME]);

    state['key'] = Base64_To_ArrayBuffer(state['key']);

    return state;
}
