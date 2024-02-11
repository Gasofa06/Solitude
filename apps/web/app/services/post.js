import { Set_Progress } from '../utils/loading_information.js';

export async function Post_Data(url = '', data = {}, json = false) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = json ? 'json' : 'arraybuffer';

    return await new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', event => {
            if (event.lengthComputable) {
                Set_Progress(event.loaded, event.total);
            }
        });

        xhr.addEventListener('loadend', () => {
            resolve(xhr.readyState === 4 && xhr.status === 200);
        });

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText,
            });
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(new Blob([data.buffer]));
    });
}
