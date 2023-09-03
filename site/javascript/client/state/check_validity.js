import { MAX_VALID_KEY_TIME } from '../../__constants__/__constants.js';
import { api } from '../../server/api.js';

/**
 * @info Verifica si la configuración del cliente es válida.
 *
 * @param {Object} _state - Configuración específica del cliente al
 * que se está evaluando.
 *
 * @return {boolean} Devuelve false si la configuración del usuario
 * no es válida y true si la configuración del usuario es valida.
 */
export async function Is_Client_State_Valid(_state) {
    let key_time = Date.now() - _state.created_at;

    if (key_time > MAX_VALID_KEY_TIME) {
        return false;
    }

    let response = await api.check(_state.uuid);
    let is_valid = response.is_valid;

    if (is_valid) {
        return true;
    } else {
        return false;
    }
}
