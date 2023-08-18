import init, { initialize, generate_keys, generate_query, decode_response } from '../pkg/client.js';
import './bz2.js';

import Build_HTML_Article from './articleCodeBook.js';

const API_URL = '/api';
const CHECK_URL = '/check';
const SETUP_URL = '/setup';
const QUERY_URL = '/query';

const api = {
    check: async uuid => getData(API_URL + CHECK_URL + '?uuid=' + uuid, true),
    setup: async data => postData(API_URL + SETUP_URL, data, true),
    query: async data => postData(API_URL + QUERY_URL, data, false),
};

async function arrayBufferToBase64(data) {
    const base64url = await new Promise(r => {
        const reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.readAsDataURL(new Blob([data]));
    });
    return base64url.split(',', 2)[1];
}

function base64ToArrayBuffer(str) {
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

async function storeState(key, uuid) {
    console.log(key);
    let dataToStore = {
        key: await arrayBufferToBase64(key),
        uuid: uuid,
        createdAt: Date.now(),
    };
    window.localStorage[window.KEY_NAME] = JSON.stringify(dataToStore);
}

async function uploadState() {
    Start_Loading('Uploading setup data', true);

    console.log('Sending public parameters...');
    let setup_resp = await api.setup(window.publicParameters);
    console.log('sent.');

    let id = setup_resp['id'];
    Stop_Loading('Uploading setup data');
    await storeState(window.key, id);
    return id;
}

async function query(targetIdx, title) {
    //
    // `!window.hasSetUp` devuelve `true` si el usuario no esta configurado.
    if (!window.hasSetUp) {
        //
        //
        let id = await uploadState();
        if (!id) return false;
        window.hasSetUp = true;
        window.id = id;
    }

    Start_Loading('Loading article');
    console.log('Generating query... (' + targetIdx + ')');
    let query = generate_query(window.client, window.id, targetIdx);
    console.log(`done (${query.length} bytes)`);

    console.log('Sending query...');
    let response = new Uint8Array(await api.query(query));
    console.log('sent.');

    Response_To_HTML(response, title);

    Stop_Loading('Loading article');
}

async function queryTitle(targetTitle) {
    let articleIndex = window.title_index[targetTitle];
    return await query(articleIndex, targetTitle);
}

async function postData(url = '', data = {}, json = false) {
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

async function getData(url = '', json = false) {
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

async function makeQuery() {
    console.log('Making the query...');

    // Deshabilitamos boton.
    window.HTML_make_query_button.disabled = true;

    // Accedemos al valor escrito en la barra de navegacion.
    let search_text = window.HTML_search_bar_input.value;

    // Continuar solo si hay algun texto escrito.
    Assert(search_text.length > 0, "Error, there isn't any text in the search bar.");

    if (selected_search_type == 'Title') {
        await queryTitle(search_text);
    } else if (selected_search_type == 'Index') {
    } else if (selected_search_type == 'Topic') {
    }

    // Habilitamos boton.
    window.HTML_make_query_button.disabled = false;

    console.log('Query finalized.');
}

/**
 * @info Recupera la configuración del usuario, si existe.
 *
 * @return {boolean} `false` si no se ha inicializado ningun usuario.
 * @return {Object} `Object` si se ha inicializado.
 */
function retrieve_client_state() {
    /**
     * Comprovamos si el ´localStorage´ esta
     * disponible y tambien verificamos si
     * el `KEY_NAME` existe en él.
     *
     * Si alguna de las dos comprovaciones
     * devuelve `false`, esta funcion tambien
     * devlovera `false`. Haciendo saber que
     * el usuario no  se ha inicializado aún.
     */
    if (!window.localStorage || !window.localStorage[window.KEY_NAME]) return false;

    /**
     * Si el usuario ya se habia inicializado,
     * leeremos el valor con el nombre `KEY_NAME`
     * (formato JSON) y lo convertiremos en un
     * objeto de `JS`.
     */
    let state = JSON.parse(window.localStorage[window.KEY_NAME]);

    /**
     * Como en el `localstorage` solo se permite
     * almacenar texto, la llave ha tenido que ser
     * almacenada en formato `Base64`.
     *
     * Para poder operar nuevamente con ella debemos
     * passarla a formato `ArrayBuffer` (`base64ToArrayBuffer(...)`)
     * y reescribirla.
     */
    state['key'] = base64ToArrayBuffer(state['key']);

    /* Devuelve el objeto con la configuracion del usuario. */
    return state;
}

/**
 * @info Verifica si la configuración del cliente es válida.
 *
 * @param {Object} state - Configuración específica del cliente al que se está evaluando.
 *
 * @return {boolean} `false` si la configuracion del usuario no es valida.
 * @return {boolean} `true` si la configuracion del usuario es valida.
 */
async function is_client_state_valid(state) {
    console.log('Verifying the validity of the cached state.');

    /**
     * Si la fecha en que fue configurado
     * el usuario supera el tiempo limite
     * (`MAX_VALID_TIME`), este usuario no
     * sera valido.
     */
    if (Date.now() - state.createdAt > window.MAX_VALID_TIME) return false;

    /**
     * Comprovar configuracion de usuario
     * mediante el uso de UUID.
     */
    let response = await api.check(state.uuid);
    let isValid = response.is_valid;
    if (!isValid) return false;

    /* Si todo esta correcto devolvemos `true`. */
    return true;
}

function setClientStateFromKey(key, shouldGeneratePubParams) {
    console.log('Initializing client state...');
    window.key = key;
    window.client = initialize(undefined, key);
    console.log('Done.');

    console.log('Generating public parameters...');
    window.publicParameters = generate_keys(window.client, key, shouldGeneratePubParams);
    // console.log(`done (${publicParameters.length} bytes)`);
}

/**
 * @return `true` si el usuario ya esta configurado.
 * @return `false` si el usuario aun no esta configurado.
 */
async function setUpClient() {
    /**
     * Comprobar si el usuario tiene una configuracion y si esta es valida.
     */
    let clientState = retrieve_client_state();
    let is_valid = new Boolean();
    if (clientState) is_valid = await is_client_state_valid(clientState);
    else is_valid = false;

    if (is_valid) {
        console.log('Loading previous client state.');

        setClientStateFromKey(clientState.key, false);
        window.id = clientState.uuid;
        return true;
    } else {
        console.log('No stored state found or existing state is no longer valid.');
        console.log('Generating a new client state.');

        /**
         * `new Uint8Array(KEY_SIZE)` inicializa un nuevo objeto `Uint8Array`,
         * con un tamaño en bytes definido por `KEY_SIZE`.
         *
         * `Uint8Array` representan una `array` de enteros sin signo de 8 bits,
         * el contenido se inicializa a 0.
         *
         * `self.crypto.getRandomValues(key)` llena la `array` creada con valores
         * aleatorios generados de manera criptográficamente segura.
         */
        let key = new Uint8Array(window.KEY_SIZE);
        self.crypto.getRandomValues(key);

        /**
         *
         */
        setClientStateFromKey(key, true);
        return false;
    }
}

/*                                                    */
/*                                                    */
/*                 NAVIGATION TOP BAR                 */
/*                                                    */
/*                                                    */

function Set_Navigation_Top_Bar_Links(
    _on_click_logo_link,
    _on_click_search_link,
    _on_click_about_link,
    _on_click_contact_link,
) {
    let html_nav_top_bar = document.querySelector('nav.top_bar');

    let html_logo_link = html_nav_top_bar.querySelector('div.logo_container a');
    let html_search_link = html_nav_top_bar.querySelector('ul.links li.search a');
    let html_about_link = html_nav_top_bar.querySelector('ul.links li.about a');
    let html_contact_link = html_nav_top_bar.querySelector('ul.links li.contact a');

    html_logo_link.onclick = _e => _on_click_logo_link(_e);
    html_search_link.onclick = _e => _on_click_search_link(_e);
    html_about_link.onclick = _e => _on_click_about_link(_e);
    html_contact_link.onclick = _e => _on_click_contact_link(_e);
}

function Set_Navigation_Top_Bar_Links_In_Homepage_Display() {
    let html_about = document.querySelector('.about_container');

    let on_click_logo_link = () => Go_To_Top();

    let on_click_search_link = () => Go_To_Top();

    let on_click_about_link = () => html_about.scrollIntoView({ behavior: 'smooth' });

    let on_click_contact_link = () => NaN;

    Set_Navigation_Top_Bar_Links(
        on_click_logo_link,
        on_click_search_link,
        on_click_about_link,
        on_click_contact_link,
    );
}

function Set_Navigation_Top_Bar_Links_In_Article_Display() {
    let html_about = document.querySelector('.about_container');

    let on_click_logo_link = () => (window.is_article_displaying = false);

    let on_click_search_link = () => (window.is_article_displaying = false);

    let on_click_about_link = () => {
        window.is_article_displaying = false;

        html_about.scrollIntoView({ behavior: 'smooth' });
    };

    let on_click_contact_link = () => NaN;

    Set_Navigation_Top_Bar_Links(
        on_click_logo_link,
        on_click_search_link,
        on_click_about_link,
        on_click_contact_link,
    );
}

/* ================================================= */
/* ================================================= */
/* ================================================= */
/*                                                   */
/*                                                   */
/*                       UTILS                       */
/*                                                   */
/*                                                   */
/* ================================================= */
/* ================================================= */
/* ================================================= */

/**
 * @info Evalúa una condición y muestra
 * un error en la consola si la condición
 * no es cierta.
 *
 * @param _condition - La condición a evaluar.
 *
 * @param {string} _message - El mensaje que se
 * muestra si la condición no se cumple.
 *
 * @returns {boolean} `false` si la condición no
 * es cierta y `true` si la condición es cierta..
 */
function Assert(_condition, _message) {
    if (!_condition) {
        console.error(_message || 'Some error occurred.');
        return false;
    }

    return true;
}

/*                                                         */
/*                                                         */
/*                                                         */
/*                                                         */
/*              PROCESSAR RESULTADO SOLICITUD              */
/*                                                         */
/*                                                         */
/*                                                         */
/*                                                         */

/**
 * @info Busca el artículo solicitado en el resultado
 * recibido por el servidor. En ocasiones, la respuesta
 * del servidor puede contener solo parte de un artículo
 * o varios artículos. Esta función tiene en cuenta dicha
 * premisa y procesa el resultado en consecuencia.
 *
 * @param {string} _plaintext_response - El resultado
 * preprocesado de la solicitud (se presenta en formato
 * de texto plano).
 *
 * @param {string} _target_title - El título del artículo
 * deseado por el usuario.
 *
 * @returns {string|boolean} - El contenido del artículo
 * deseado (listo para ser utilizado como modelo para
 * construir el artículo) se proporcionará en caso de
 * encontrarse, o se devolverá `false` si no se encuentra
 */
function Find_Requested_Article(_plaintext_response, _target_title) {
    _target_title = _target_title.toLowerCase();

    /*
     * Carácter de separación utilizado para
     * marcar el final de un artículo.
     */
    let separation_letter = 'Ω';

    /*
     * Expresión regular para buscar el título
     * de un artículo cualquiera. Los títulos
     * están comprendidos entre "T:" y "‽".
     *
     * Ej. T:Centralización del Poder‽
     */
    let regex = /\T:(.*?)‽/;

    let arr_articles = _plaintext_response.split(separation_letter).filter(_article => {
        /* Extraemos el título del artículo. */
        let title = regex.exec(_article);

        /* Si el artículo no es válido lo descartamos. */
        if (!title || title.length <= 1) return false;

        /*
         * Expresión regular para buscar el título
         * Comparamos el título obtenido con `_target_title`
         * para determinar si es el artículo que buscamos.
         *
         * En caso de que lo sea, no lo descartamos.
         */
        if (title[1].toLowerCase() === _target_title) return true;
    });

    /* Verificamos si se encontró algún artículo válido. */
    let is_valid = Assert(
        arr_articles.length !== 0,
        'Error, there is no article with the same title as the one requested.',
    );

    if (!is_valid) return false;

    /**
     * Tomamos el primer artículo válido
     * encontrado (asumiendo que solo debe
     * haber uno) y lo devolvemos.
     */
    let article = arr_articles[0];

    return article;
}

/* TODO */
function Response_To_HTML(_response, _target_title) {
    console.log('Decoding result...');
    console.log(_response);

    let result = decode_response(window.client, _response);
    console.log(result);

    let decompressedData = bz2.decompress(result);
    console.log(decompressedData);

    let response_txt = new TextDecoder('utf-8').decode(decompressedData);
    console.log(response_txt);

    console.log('Done.');

    let article = Find_Requested_Article(response_txt, _target_title);

    let time_start = Date.now();
    Build_HTML_Article(article);
    let time_finish = Date.now();

    let delta_time = time_finish - time_start;
    console.log(
        'It took ' + delta_time.toString() + ' miliseconds to build and display the article.',
    );

    window.is_article_displaying = true;

    Go_To_Top();
}

/* ================================================== */
/* ================================================== */
/* ================================================== */
/*                                                    */
/*                                                    */
/*        FUNCTIONS FOR THE DISPLACEMENT EVENT        */
/*                                                    */
/*                                                    */
/* ================================================== */
/* ================================================== */
/* ================================================== */

let _is_article_displaying = false;

let all_aricle_sections;
let table_of_contents_navigation_links;

/**
 * @info Define una propiedad
 * "is_article_displaying" en el
 * objeto global "window", que permite
 * acceder y modificar el estado de visualización
 * del artículo desde cualquier lugar del código.
 */
Object.defineProperty(window, 'is_article_displaying', {
    /**
     * @info Función `getter` que devuelve
     * el valor actual del estado de
     * visualización del artículo.
     *
     * @return {boolean} - El estado de
     * visualización del artículo.
     */
    get: () => {
        return _is_article_displaying;
    },

    /**
     * @info Función `setter` que permite
     * establecer un nuevo valor para el
     * estado de visualización del artículo
     * y ejecutar un codigo para cuando
     * esto suceda.
     *
     * @param {boolean} _bool - El nuevo valor
     * para establecer el estado de visualización
     * del artículo.
     */
    set: _bool => {
        _is_article_displaying = _bool;

        let html_about = document.querySelector('.about_container');
        let html_homepage = document.querySelector('.homepage_container');

        let html_article = document.querySelector('.query_result_container article');

        /*
         * Si el artículo ya no se está mostrando,
         * se reinician las variables, se muestra
         * el `About` y la `Homepage`, así como se
         * elimina el artículo.
         */
        if (!_is_article_displaying) {
            all_aricle_sections = null;
            table_of_contents_navigation_links = null;

            html_homepage.classList.remove('disactive');
            html_about.classList.remove('disactive');

            html_article.remove();

            Go_To_Top();

            Set_Navigation_Top_Bar_Links_In_Homepage_Display();

            return;
        }

        all_aricle_sections = html_article.querySelectorAll('[id^="section-"]');
        table_of_contents_navigation_links = html_article.querySelectorAll(
            'nav.table_contents ul li a',
        );

        /*
         * Agregamos una función a todos los
         * enlaces de navegación del artículo
         * para que redireccionen al usuario
         * hacia la sección que desea.
         */
        table_of_contents_navigation_links.forEach((_link, _idx) => {
            if (_idx == 0) _link.classList.add('active');

            _link.addEventListener('click', () => {
                all_aricle_sections[_idx].scrollIntoView({ behavior: 'smooth' });
            });
        });

        html_homepage.classList.add('disactive');
        html_about.classList.add('disactive');

        let html_backward_link = document.querySelector('.backward_link');
        html_backward_link.addEventListener('click', () => (window.is_article_displaying = false));

        let html_back_to_top_button = document.querySelector('.back_to_top');
        html_back_to_top_button.addEventListener('click', () => Go_To_Top());

        /*
         * Cambiamos la función que los botones
         * de la barra de navegación superior
         * deben cumplir; dado que al existir
         * un artículo, los pasos necesarios
         * para redirigir al usuario a ese sitio
         * son distintos.
         */
        Set_Navigation_Top_Bar_Links_In_Article_Display();

        Clear_Search_Text_Input();
    },
});

/**
 * @info Función para manejar el
 * evento de desplazamiento (_scroll_).
 */
function Handle_Scroll() {
    if (!window.is_article_displaying) return;

    if (all_aricle_sections.length < 1 || table_of_contents_navigation_links.length < 1) {
        return;
    }

    let current_scroll_Y_position = window.scrollY;

    /*
     * Recorre cada sección del articulo
     * para determinar cuál está en la
     * vista del usuario.
     */
    all_aricle_sections.forEach((section, index) => {
        let section_height = section.clientHeight;
        let section_top_position = section.offsetTop;

        /*
         * Verificamos si la posición actual
         * de desplazamiento está dentro de
         * los límites de la sección actual.
         */
        if (
            current_scroll_Y_position >= section_top_position - 12 &&
            current_scroll_Y_position < section_top_position + section_height - 12
        ) {
            /*
             * Si la sección está en la vista,
             * remueve la clase "active" de todos
             * los enlaces de navegación.
             */
            table_of_contents_navigation_links.forEach(a => a.classList.remove('active'));

            /*
             * Agrega la clase "active" al enlace
             * de navegación que corresponde a la
             * sección actual.
             */
            table_of_contents_navigation_links[index].classList.add('active');

            return;
        }
    });
}

/**
 * @info Función que se desplaza hasta
 * arriba de la página web.
 */
const Go_To_Top = () => document.body.scrollIntoView({ behavior: 'smooth' });

/* ================================================= */
/* ================================================= */
/* ================================================= */
/*                                                   */
/*                                                   */
/*                    CLICK EVENT                    */
/*                                                   */
/*                                                   */
/* ================================================= */
/* ================================================= */
/* ================================================= */

/**
 * @info `window.onclick` se ejecuta
 * cuando se hace clic en cualquier
 * lugar de la ventana.
 */
window.onclick = function (event) {
    /*
     * Si el clic no se produce dentro del
     * desplegable de selección de tipo de búsqueda,
     * se oculta el desplegable.
     */
    if (
        !event.target.matches(
            '.dropdown_li input, .container_selected_content input, #dropdown_search_type_content_sub',
        )
    ) {
        document.getElementById('checkbox_drop_search_types').checked = false;
    }

    /*
     * Si se presiona fuera del desplegable
     * que muestra las sugerencias de busqueda,
     * el despleable desaparecera.
     */
    if (!event.target.matches('#search_bar_input_text, #search_suggestions')) {
        Clear_Existing_Suggestions();
    }
};

/* ================================================= */
/* ================================================= */
/* ================================================= */
/*                                                   */
/*                                                   */
/*       INFORMATION ABOUT THE STATE OF CHARGE       */
/*                                                   */
/*                                                   */
/* ================================================= */
/* ================================================= */
/* ================================================= */

/**
 * @info Realiza las acciones necesarias
 * al iniciar la carga.
 *
 * @param {string} _message - El mensaje a mostrar
 * en la interfaz mientras la carga es ejecutada.
 *
 * @param {boolean} _is_manually_progress - Indica
 * si se asignará la longitud de la barra de progreso
 * manualmente en JavaScript (true) o automáticamente
 * en CSS (false).
 */
function Start_Loading(_message, _is_manually_progress) {
    window.HTML_make_query_button.disabled = true;
    window.HTML_make_query_button.classList.add('loading');

    window.HTML_search_bar_input.readOnly = true;

    /*
     * Mostramos el mensaje.
     */
    document.getElementById('loading_text').innerHTML = _message;

    /*
     * Si `_is_manually_progress == true`,
     * coloclamos `manually_progress` para
     * que CSS sepa que se asignara la longitud
     * de la barra manualmente (en JS).
     */
    if (_is_manually_progress) {
        let html_loading_spinner = document.getElementById('loading_spinner');
        html_loading_spinner.classList.add('manually_progress');
    }
}

/**
 * @info Realiza las acciones necesarias al
 * detener la carga.
 *
 * @param {string} _message - El mensaje a mostrar
 * en la interfaz cuando la carga es detenida.
 */
function Stop_Loading(_message) {
    window.HTML_make_query_button.disabled = false;
    window.HTML_make_query_button.classList.remove('loading');

    window.HTML_search_bar_input.readOnly = false;

    /*
     * Mostramos el mensaje.
     */
    document.getElementById('loading_text').innerHTML = _message;

    /*
     * Si `html_loading_spinner` tiene
     * `.manually_progress`, eliminamos
     * dicha clase.
     */
    let html_loading_spinner = document.getElementById('loading_spinner');
    if (html_loading_spinner.classList.contains('manually_progress')) {
        html_loading_spinner.classList.remove('manually_progress');
    }
}

/**
 * @info Asigna y muestra el progreso de
 * carga manualmente.
 *
 * @param {number} _loaded - El número de carga actual.
 *
 * @param {number} _total_to_load - El número máximo de carga.
 */
function Set_Progress(_loaded, _total_to_load) {
    let html_loading_spinner = document.getElementById('loading_spinner');

    /*
     * `html_loading_spinner` debe tener la
     * clase `manually_progress`.
     */
    let is_valid = Assert(
        html_loading_spinner.classList.contains('manually_progress'),
        'Error, the loading circle must have `.manually_progress` class assigned.',
    );

    if (!is_valid) return;

    let progress = Math.round((_loaded / _total_to_load) * 130);
    html_loading_spinner.style.stroke_dasharray = progress + ', 130';
}

/* ================================================= */
/* ================================================= */
/* ================================================= */
/*                                                   */
/*                                                   */
/*         SEARCH BAR + SUGGESTION FUNCTIONS         */
/*                                                   */
/*                                                   */
/* ================================================= */
/* ================================================= */
/* ================================================= */

let max_search_suggestions = 5;

/**
 * @info Muestra las sugerencias de búsqueda
 * en la interfaz e inserta una funciòn para
 * cuando se hace clic en alguna de las
 * sugerencias.
 *
 * @param {Array of strings} _suggestions - Las
 * sugerencias de búsqueda que se mostraran en
 * pantalla.
 *
 * @param {string} _search_text - El texto de
 * búsqueda ingresado por el usuario.
 */
function Show_Suggestions_Type_Title(_suggestions, _search_text) {
    // prettier-ignore
    var hmtl_suggestions =
        '<div class="search_suggestions_container">' +
            _suggestions
                .map(txt => {
                    /*
                     * Dividimos el texto que coincide
                     * del que no.
                     */
                    let matching_txt = txt.substr(0, _search_text.length);
                    let not_matching_txt = txt.substr(_search_text.length);

                    return (
                        '<li class="suggestion">' +
                            '<input type="button" data-suggestion="' + txt + '">' +
                            '<p>' +
                                '<b>' + matching_txt + '</b>' +
                                not_matching_txt +
                            '</p>' +
                        '</li>'
                    );
                })
                .join('') +
        '</div>';

    let html_search_suggestions = document.getElementById('search_suggestions');
    html_search_suggestions.insertAdjacentHTML('afterbegin', hmtl_suggestions);

    let all_input_suggestions = html_search_suggestions.querySelectorAll(
        '.search_suggestions_container .suggestion input',
    );

    all_input_suggestions.forEach(input => {
        input.onclick = _e => {
            /*
             * El atributo "data-suggestion" fue
             * definido en el momento de su creación
             * y se refiere al titulo del articulo.
             */
            let suggestion_content = _e.target.getAttribute('data-suggestion');
            window.HTML_search_bar_input.value = suggestion_content;

            Clear_Existing_Suggestions();

            window.HTML_make_query_button.click();
        };
    });
}

function Show_Suggestions_Type_Topic(_suggestions, _search_text) {}

function Show_Suggestions_Type_Reference(_suggestions, _search_text) {}

/**
 * @info Actualiza las sugerencias de búsqueda
 * en la barra de navegación.
 *
 * @param {Event} _e - El evento de entrada
 * que activó la función.
 */
function Search_Bar_Sugestions(_e) {
    if (selected_search_type == 'Title') {
        Clear_Existing_Suggestions();

        let search_txt = _e.target.value;

        let minimum_num_of_letters = 3;
        if (search_txt.length < minimum_num_of_letters) return;

        /*
         * `arr_articles` almacena una `array str` con
         * los nombres de todos los articulos.
         */
        let arr_articles = Object.keys(window.title_index);

        /*
         * `arr_matching_articles` almacena una `array`
         * con todos los elementos que comiencen por
         * `search_text`.
         */
        var arr_matching_articles = arr_articles.filter(e => e.startsWith(search_txt));

        if (arr_matching_articles.length < 0) return;

        arr_matching_articles.sort();

        /*
         * Limitamos el numero de sugerencias a una
         * cantidad maxima establecida por
         * `max_search_suggestions`.
         */
        if (arr_matching_articles.length > max_search_suggestions) {
            arr_matching_articles = arr_matching_articles.slice(0, max_search_suggestions);
        }

        Show_Suggestions_Type_Title(arr_matching_articles, search_txt);
    }
    //   space   //
    else if (selected_search_type == 'REF.') {
        Show_Suggestions_Type_Reference();
    }
    //   space   //
    else if (selected_search_type == 'Topic') {
        Show_Suggestions_Type_Topic();
    }
}

/**
 * @info Limpia el campo de texto de la barra
 * de búsqueda.
 */
const Clear_Search_Text_Input = () => (window.HTML_search_bar_input.value = '');

/**
 * @info Función para cambiar el `placeholder`
 * de la barra de búsqueda.
 *
 * @param {string} _new_placeholder - El texto
 * del nuevo `placeholder`.
 */
const Change_Search_Input_Placeholder = _new_placeholder => {
    window.HTML_search_bar_input.setAttribute('placeholder', _new_placeholder);
};

/**
 * @info Elimina la interfaz de las sugerencias
 * de búsqueda existentes.
 */
const Clear_Existing_Suggestions = () => {
    var search_suggestions_container = document.querySelector('div.search_suggestions_container');
    if (search_suggestions_container) search_suggestions_container.remove();
};

/*                                                         */
/*                                                         */
/*                                                         */
/*                                                         */
/*                    TIPOS DE BUSQUEDA                    */
/*                                                         */
/*                                                         */
/*                                                         */
/*                                                         */

const SEARCH_TYPES = {
    Title: {
        id: 0,
        placeholder: 'Search article by title (e.g. Conan Edogawa)',
    },
    'Ref.': {
        id: 1,
        placeholder: 'Search article by reference (e.g. 286)',
    },
    Topic: {
        id: 2,
        placeholder: 'Search posts by topic (e.g. Anime; Music;)',
    },
};

let selected_search_type = 'Title';

/**
 * @info Establece el tipo de búsqueda y
 * realiza las acciones correspondientes.
 *
 * @param {string} _new_type - El nombre del
 * nuevo tipo de búsqueda a establecer.
 */
function Set_Search_Type(_new_type) {
    let is_valid = Assert(
        SEARCH_TYPES[_new_type] != undefined,
        'Error, the provided parameter does not correspond to any search type.',
    );

    if (!is_valid) return;

    /*
     * Deseleccionamos el tipo de búsqueda que
     * hasta ahora ha estado asignado.
     */
    let index_selected_type = SEARCH_TYPES[selected_search_type].id;
    let html_selected_type = window.HTML_dropdown_search_type_inputs[index_selected_type];
    html_selected_type.classList.remove('selected');

    /*
     * Selecionamos el nuevo tipo de búsqueda
     * selecionado por el usuario.
     */
    let index_new_type = SEARCH_TYPES[_new_type].id;
    let html_new_type = window.HTML_dropdown_search_type_inputs[index_new_type];
    html_new_type.classList.add('selected');

    Clear_Search_Text_Input();

    let new_placeholder = SEARCH_TYPES[_new_type].placeholder;
    Change_Search_Input_Placeholder(new_placeholder);

    /*
     * Actualizamos el tipo de búsqueda seleccionado
     * en el boton para desplegar su selección.
     */
    document.getElementById('selected_search_type').innerHTML = _new_type.toUpperCase();

    selected_search_type = _new_type;
}

/**
 * @info Genera el contenido para el menú
 * desplegable que permite seleccionar el
 * tipo de búsqueda deseado.
 */
function Generate_Search_Type_Dropdown_Content() {
    let html_dropdown_search_type_content = document.getElementById(
        'dropdown_search_type_content_sub',
    );

    /*
     * `arr_search_types_names` almacena una `array str`
     * con los nombres de los diferentes tipos de busqueda.
     */
    let arr_search_types_names = Object.keys(SEARCH_TYPES);

    arr_search_types_names.forEach(_search_type_name => {
        // prettier-ignore
        var HTML_search_type =
            '<li class="dropdown_li">' +
                '<input type="button" value="' + _search_type_name + '"/>' +
            '</li>';

        html_dropdown_search_type_content.insertAdjacentHTML('beforeend', HTML_search_type);
    });

    /*
     * `HTML_dropdown_search_type_inputs` almacena
     * una `array` con todos los `inputs` de todos
     * los tipos de busquedas.
     */
    window.HTML_dropdown_search_type_inputs =
        html_dropdown_search_type_content.querySelectorAll('.dropdown_li input');

    /*
     * Asignamos funciones de clicado.
     */
    window.HTML_dropdown_search_type_inputs.forEach(_input => {
        _input.onclick = _e => Set_Search_Type(_e.target.value);
    });
}

/*                                                          */
/*                                                          */
/*                                                          */
/*                                                          */
/*      FUNCIONES RELACIONADAS CON EL ESTILO DE LA WEB      */
/*                                                          */
/*                                                          */
/*                                                          */
/*                                                          */

/**
 * @info Cambia el estilo de la pagina y
 * asignamos (si es posible) un nuevo estilo
 * predeterminado en el `localStorage` del
 * usuario.
 */
function toggle_theme() {
    if (window.theme == 'light') window.theme = 'dark';
    else if (window.theme == 'dark') window.theme = 'light';

    document.documentElement.setAttribute('theme', window.theme);

    /*
     * Guardamos el nuevo `theme`
     * como predeterminado.
     */
    localStorage.setItem('data-theme', window.theme);
}

/*                                                        */
/*                                                        */
/*                                                        */
/*                                                        */
/*                    CODIGO PRINCIPAL                    */
/*                                                        */
/*                                                        */
/*                                                        */
/*                                                        */

/**
 * @info Inicializa los eventos de la interfaz web.
 */
function Initialize_Web_Events() {
    /*
     * Accedemos al interruptor para cambiar
     * el estilo de la web y le insertamos un
     * evento para cambiar el tema cuando este
     * se active o desactive.
     */
    document.getElementById('switch_theme_toggle').onclick = () => toggle_theme();

    /*
     * Evento para actualizar las sugerencias
     * de búsqueda cuando el valor del campo
     * de búsqueda cambie.
     */
    window.HTML_search_bar_input.addEventListener('input', e => Search_Bar_Sugestions(e));

    /*
     * Evento para realizar una solicitud al
     * servidor al hacer clic en el botón.
     */
    window.HTML_make_query_button.onclick = () => makeQuery();

    /*
     * Agregar el evento de desplazamiento
     * (_scroll_) para llamar a la función
     * `handleScroll` cada vez que el usuario
     * se desplaza.
     */
    window.addEventListener('scroll', Handle_Scroll);
}

/**
 * @info Función asincrónica que se encarga
 * de ejecutar el código principal.
 */
async function run() {
    /*
     * Debemos inicializar el módulo WebAssembly
     * (en este caso `../pkg/client.js`) antes de
     * llamar a cualquier funcion `wasm`.
     */
    Start_Loading('Initializing');
    await init();
    Stop_Loading('Done');

    /*
     * El tamaño (en `bytes`) de la clave.
     */
    window.KEY_SIZE = 32;

    /*
     * El nombre que recibe la clave (y sus
     * demas datos) en el almacenamiento
     * local (`localStorage`).
     */
    window.KEY_NAME = 'spiralKey';

    /*
     * El tiempo máximo de validez de la clave
     * en milisegundos. En este caso 1 semana.
     */
    window.MAX_VALID_TIME = 604800000;

    window.theme = document.documentElement.getAttribute('theme');

    Generate_Search_Type_Dropdown_Content();
    Set_Search_Type(selected_search_type);

    Start_Loading('Loading article titles...');

    /*
     * Accedemos a la lista completa (`.json`) que
     * contiene los titulos de los articulos y sus
     * indices.
     */
    let title_index_list_p = getData('data/title_and_indices.json', true);

    let setupClientResult = setUpClient();

    window.title_index = await title_index_list_p;
    window.hasSetUp = await setupClientResult;

    Stop_Loading('Articles loaded.');

    Initialize_Web_Events();
    Set_Navigation_Top_Bar_Links_In_Homepage_Display();
}

/**
 * @info Espera a que se cargue completamente
 * el `DOM` antes de ejecutar el código.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Boton para realizar las solicitudes
     * a la base de datos.
     */
    window.HTML_make_query_button = document.getElementById('make_query_button');

    /**
     * Cuadro de texto donde se escribe el
     * título o índice del artículo deseado.
     */
    window.HTML_search_bar_input = document.getElementById('search_bar_input_text');

    /**
     * `Array` con todos los `inputs` de todos
     * los tipos de busquedas.
     */
    window.HTML_dropdown_search_type_inputs;

    run();
});
