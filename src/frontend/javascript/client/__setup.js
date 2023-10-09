import { KEY_SIZE } from '../__constants__/__constants.js';

import { Set_Client_State_From_Key } from './state/set_from_key.js';
import { Is_Client_State_Valid } from './state/check_validity.js';
import { Retrieve_Client_State } from './state/retrieve.js';

/**
 * @info Comprueba si el usuario tiene una configuración guardada y
 * si dicha configuración es válida. Si es válida, carga el estado
 * anterior del cliente. Si no hay una configuración válida, se genera
 * un nuevo estado de cliente.
 *
 * @return {boolean} Devuelve true si se pudo cargar un estado de cliente
 * previo, o false si no se encontró una configuración válida.
 */
export async function Setup_Client() {
    let client_state = Retrieve_Client_State();

    if (client_state) {
        var is_valid = await Is_Client_State_Valid(client_state);
    } else {
        var is_valid = false;
    }

    if (is_valid) {
        console.log('Loading previous client state.');

        Set_Client_State_From_Key(client_state.key, false);
        window.id = client_state.uuid;

        return true;
    } else {
        console.log('Generating a new client state.');

        let key = new Uint8Array(KEY_SIZE);
        self.crypto.getRandomValues(key);

        Set_Client_State_From_Key(key, true);

        return false;
    }
}
