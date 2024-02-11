import {
    KEY_SIZE,
    KEY_NAME,
    MAX_VALID_KEY_TIME,
} from '../../[constants]/constants.js';

import { api } from '../api.js';
import { initialize, generate_keys } from '../../../pkg/client.js';

/**
 * @info En localStorage, solo se almacenan textos. Para guardar datos
 * binarios, como ArrayBuffer, conviene convertirlos al formato Base64.
 * La función siguiente convierte un ArrayBuffer en cadena Base64.
 *
 * @param {ArrayBuffer} data - El ArrayBuffer que se va a convertir en
 * formato Base64.
 *
 * @return {string} Una cadena que representa el contenido del ArrayBuffer
 * en formato Base64.
 */
async function ArrayBuffer_To_Base64(data) {
    let base64_url = await new Promise(r => {
        let reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.readAsDataURL(new Blob([data]));
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
 * @param {string} str - El Base64 que se va a convertir en ArrayBuffer.
 *
 * @return {ArrayBuffer} El ArrayBuffer.
 */
function Base64_To_ArrayBuffer(str) {
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

/**
 * @info Aalmacena el estado del cliente en el almacenamiento local del
 * navegador. El estado incluye la clave del cliente convertida en formato
 * Base64, el identificador único del cliente y la marca de tiempo de creación.
 *
 * @param {ArrayBuffer} key - La clave en formato ArrayBuffer que se va a almacenar.
 * @param {string} uuid - El identificador único del cliente que se va a almacenar.
 */
async function Store_State(key, uuid) {
    let state = {
        key: await ArrayBuffer_To_Base64(key),
        uuid: uuid,
        created_at: Date.now(),
    };

    window.localStorage[KEY_NAME] = JSON.stringify(state);
}

function Set_Client_State_From_Key(key, should_generate_pub_params) {
    console.log('Initializing client state...');
    window.key = key;
    window.client = initialize(undefined, key);
    console.log('Done.');

    console.log('Generating public parameters...');
    window.public_parameters = generate_keys(
        window.client,
        key,
        should_generate_pub_params,
    );
    console.log(`Done.`);
}

/**
 * @info Recupera la configuración del usuario, si existe.
 *
 * @return {boolean|Object} Devuelve false si no se ha inicializado
 * ningun usuario y un Object con la configuración si se ha inicializado.
 */
function Retrieve_Client_State() {
    if (!window.localStorage || !window.localStorage[KEY_NAME]) {
        return false;
    }

    let state = JSON.parse(window.localStorage[KEY_NAME]);

    state['key'] = Base64_To_ArrayBuffer(state['key']);

    return state;
}

/**
 * @info Verifica si la configuración del cliente es válida.
 *
 * @param {Object} state - Configuración específica del cliente al
 * que se está evaluando.
 *
 * @return {boolean} Devuelve false si la configuración del usuario
 * no es válida y true si la configuración del usuario es valida.
 */
async function Is_Client_State_Valid(state) {
    let key_time = Date.now() - state.created_at;

    if (key_time > MAX_VALID_KEY_TIME) {
        return false;
    }

    let response = await api.check(state.uuid);
    let is_valid = response.is_valid;

    if (is_valid) {
        return true;
    } else {
        return false;
    }
}

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

/**
 * @info Envía los parámetros públicos al servidor y luego almacena el estado
 * del cliente en el almacenamiento local.
 *
 * @return {string} El identificador único asignado por el servidor al cliente.
 */
export async function Upload_State() {
    console.log('Sending public parameters...');
    console.log(window.public_parameters);
    let setup_response = await api.setup(window.public_parameters);
    console.log('Sent.');

    let id = setup_response['id'];

    await Store_State(window.key, id);

    return id;
}
