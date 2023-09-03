import { api } from '../../server/api.js';
import { Store_State } from './store.js';

/**
 * @info Envía los parámetros públicos al servidor y luego almacena el estado
 * del cliente en el almacenamiento local.
 *
 * @return {string} El identificador único asignado por el servidor al cliente.
 */
export async function Upload_State() {
    console.log('Sending public parameters...');
    let setup_response = await api.setup(window.public_parameters);
    console.log('Sent.');

    let id = setup_response['id'];

    await Store_State(window.key, id);

    return id;
}
