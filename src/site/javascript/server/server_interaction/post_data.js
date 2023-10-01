export async function Post_Data(url = '', data = {}, json = false) {
    // No se puede usar `Fetch API` aquí porque carece de indicación de progreso.

    // El constructor `new XMLHttpRequest();` inicializa un XMLHttpRequest.
    // Debe llamarse antes que cualquier otra llamada de método.
    // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
    const xhr = new XMLHttpRequest();

    // Especificamos el tipo de datos contenidos en la respuesta.
    // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
    xhr.responseType = json ? 'json' : 'arraybuffer';

    return await new Promise((resolve, reject) => {
        // Cuando ocurre un evento de progreso durante una carga de datos, se ejecuta una función `{...}` que recibe el objeto `event` como argumento.
        // Esta función se utiliza para llevar a cabo acciones específicas en respuesta al progreso de la carga, como actualizar una barra de progreso o mostrar información adicional al usuario.
        xhr.upload.addEventListener('progress', event => {
            if (event.lengthComputable) {
                Set_Progress(event.loaded, event.total);
            }
        });

        // La función `xhr.addEventListener("loadend", () => {...})` añade un evento de escucha al objeto XHR (XMLHttpRequest) para el evento "loadend" (finalización de la carga).
        // Cuando se produce la finalización de la carga de datos, se ejecuta la función que está dentro del bloque de código `{...}`.
        xhr.addEventListener('loadend', () => {
            // `xhr.readyState === 4` indica que la solicitud ha sido completada y la respuesta del servidor ha sido recibida en su totalidad.
            // `xhr.status === 200` significa que el servidor ha procesado la solicitud correctamente y ha devuelto una respuesta válida.
            resolve(xhr.readyState === 4 && xhr.status === 200);
        });

        // El evento `onload` se dispara cuando la solicitud se ha completado satisfactoriamente y se ha recibido la respuesta del servidor.
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

        // La función `xhr.open(...)` se utiliza para configurar una solicitud HTTP.
        //   - "POST": Especifica el método HTTP utilizado en la solicitud. En este caso, se utiliza el método "POST" que se utiliza comúnmente para enviar datos al servidor.
        //   - `url`: Es la URL a la que se realizará la solicitud.
        //   - `true`: Este parámetro especifica si la solicitud debe ser asíncrona o síncrona. Al establecerlo en true, indica que la solicitud debe ser asíncrona.
        // Al llamar a xhr.open("POST", url, true), se inicia el proceso de configuración de la solicitud.
        // Es importante tener en cuenta que esta línea de código solo configura la solicitud y no la envía al servidor.
        xhr.open('POST', url, true);

        // Configuracion adicional.

        // Al llamar a ´xhr.setRequestHeader("Content-Type", "application/octet-stream")´, se configura el encabezado "Content-Type" de la solicitud para indicar al servidor que se está enviando un flujo de datos binarios.
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');

        // `xhr.send(...)` se utiliza para enviar datos al servidor utilizando el objeto XHR (XMLHttpRequest).
        // En este caso, se crea un nuevo objeto `Blob` a partir de `data.buffer`, que es una secuencia de bytes o un búfer de datos.
        // El objeto `Blob` representa un archivo o un flujo de datos de cualquier tipo.
        // Luego, la función `xhr.send()` se utiliza para enviar el objeto `Blob` al servidor como parte del cuerpo de la solicitud.
        // El servidor recibirá estos datos binarios y podrá procesarlos según sea necesario.
        xhr.send(new Blob([data.buffer]));
    });
}
