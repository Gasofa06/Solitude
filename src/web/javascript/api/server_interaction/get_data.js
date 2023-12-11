// getData
export async function Get_Data(url = '', json = false) {
    // `response` => respuesta de la solicitud GET a una URL determinada por `url`.
    const response = await fetch(url, {
        method: 'GET',
        cache: 'default',
        credentials: 'omit',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    // `json` especifica si los datos deben de ser devueltos como `JSON` o como un `Uint8Array`.
    if (json) {
        return response.json();
    } else {
        let data = await response.arrayBuffer();
        return new Uint8Array(data);
    }
}
