import { StartLoading, StopLoading } from '/javascript/utils/loading-info.js';
import { PageController } from '/javascript/search/index.js';

import { Setup_Client } from '/javascript/services/client/client.js';
import InitWASM from '/pkg/client.js';
import { SetData } from '/javascript/data/set-data.js';

async function App() {
    window.page_controller = new PageController();

    StartLoading('Initializing WebAssembly...');
    await InitWASM();
    StopLoading('Done');

    StartLoading('Geting server data...');
    await SetData();
    StopLoading('Server data loaded');

    StartLoading('Seting up the client...');
    let client = Setup_Client();
    window.client_has_set_up = await client;
    StopLoading('Client seted up');
}

document.addEventListener('DOMContentLoaded', App());
