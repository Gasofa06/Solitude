import { StartLoading, StopLoading } from './utils/loading-info.js';
import { PageController } from '/javascript/search/index.js';

import { Setup_Client } from './services/client/client.js';
import Initialize_Web_Assembly from '../pkg/client.js';
import Setup_Data from './scripts/set-data.js';

async function App() {
    window.page_controller = new PageController();

    StartLoading('Initializing WebAssembly');
    await Initialize_Web_Assembly();
    StopLoading('Done');

    StartLoading('Geting server data');
    await Setup_Data();
    StopLoading('Server data loaded');

    StartLoading('Seting up the client');
    let client = Setup_Client();
    window.client_has_set_up = await client;
    StopLoading('Client seted up');
}

document.addEventListener('DOMContentLoaded', App());
