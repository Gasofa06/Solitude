import { initialize, generate_keys } from '../../../pkg/client.js';

export function Set_Client_State_From_Key(_key, _should_generate_pub_params) {
    console.log('Initializing client state...');
    window.key = _key;
    window.client = initialize(undefined, _key);
    console.log('Done.');

    console.log('Generating public parameters...');
    window.public_parameters = generate_keys(
        window.client,
        _key,
        _should_generate_pub_params,
    );
    console.log(`Done.`);
}
