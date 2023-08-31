import { Start_Loading, Stop_Loading } from './platform_utils/__utils.js';

import { PageController } from './pages/__controller__/__controller.js';

import Initialize_Web_Assembly from '../pkg/client.js';

import Setup_Data from './server/data_setup/__setup.js';

import { Setup_Client } from './client/__setup.js';

/**
 * @info Función asincrónica que se encarga de ejecutar el código
 * principal. Se espera a que se cargue completamente el `DOM` antes
 * de ser llamada.
 */
async function App() {
    window.page_controller = new PageController();

    Start_Loading('Initializing WebAssembly');
    await Initialize_Web_Assembly();
    Stop_Loading('Done');

    Start_Loading('Geting server data');
    await Setup_Data();
    Stop_Loading('Server data loaded');

    Start_Loading('Seting up the client');
    let client = Setup_Client();
    window.client_has_set_up = await client;
    Stop_Loading('Client seted up');
}

document.addEventListener('DOMContentLoaded', App());
