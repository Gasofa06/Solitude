const API_URL = '/api';
const CHECK_URL = '/check';
const SETUP_URL = '/setup';
const QUERY_URL = '/query';

export async function GetData(url = '', json = false) {
    let response = await fetch(url, {
        method: 'GET',
        cache: 'default',
        credentials: 'omit',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    if (json) {
        return response.json();
    } else {
        let data = await response.arrayBuffer();
        return new Uint8Array(data);
    }
}

let Loadend = (xhr, resolve) => {
    resolve(xhr.readyState === 4 && xhr.status === 200);
};

let OnLoad = (xhr, resolve, reject) => {
    if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
    } else {
        reject({
            status: xhr.status,
            statusText: xhr.statusText,
        });
    }
};

let OnError = (xhr, reject) => {
    reject({
        status: xhr.status,
        statusText: xhr.statusText,
    });
};

async function PostData(url = '', data = {}, json = false) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = json ? 'json' : 'arraybuffer';

    return await new Promise((resolve, reject) => {
        xhr.addEventListener('loadend', () => Loadend(xhr, resolve));
        xhr.onload = () => OnLoad(xhr, resolve, reject);
        xhr.onerror = () => OnError(xhr, reject);

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(new Blob([data.buffer]));
    });
}

export let api = {
    check: async uuid => GetData(API_URL + CHECK_URL + '?uuid=' + uuid, true),
    setup: async data => PostData(API_URL + SETUP_URL, data, true),
    query: async data => PostData(API_URL + QUERY_URL, data, false),
};
