/* ================================================== */
/* ================================================== */
/* ================================================== */
/*                                                    */
/*                                                    */
/*                 FUNCIONES DE AYUDA                 */
/*                                                    */
/*                                                    */
/* ================================================== */
/* ================================================== */
/* ================================================== */

/**
 * Array para almacenar las secciones
 * del artículo que contengan ID. Los
 * elementos de esta, se utilizarán
 * para generar la tabla de contenidos.
 */
let arr_names_of_sections_with_id = new Array();

/**
 * Genera un ID único para una sección
 * del articulo y lo añade a la lista
 * de secciones con ID.
 *
 * @param {string} _name - Nombre de
 * la sección para generar el ID.
 *
 * @return {string} - ID generado
 * para la sección.
 */
function Generate_ID(_name) {
    let n = _name.toLowerCase().replace(' ', '-');
    let id = 'section-' + n;

    arr_names_of_sections_with_id.push(_name);

    return id;
}

/**
 * Realiza una búsqueda utilizando una
 * expresión regular en el texto (_txt)
 * proporcionado y devuelve el resultado
 * encontrado.
 *
 * @param {string} _txt - Texto en el
 * que se realizará la búsqueda.
 *
 * @param {RegExp} _regex - Expresión
 * regular utilizada para buscar el
 * patrón deseado.
 *
 * @param {string|null} _split - Opcional.
 * Si se proporciona, se utilizará para
 * dividir el resultado encontrado en un
 * `array`, utilizando el valor de `_split`
 * como separador.
 *
 * @return {string|null|array} - Devuelve
 * el resultado encontrado o `null` si no
 * se encontraron coincidencias. Si se
 * proporciona el parámetro `_split`,
 * el resultado se devolverá como un
 * `array`.
 */
function Find(_txt, _regex, _split = null) {
    let match = _regex.exec(_txt);

    if (match && match.length > 1) {
        let result = match[1];

        if (_split) return result.split(_split);
        else return result;
    }

    return null;
}

/**
 * Devuelve todas las variables globales
 * al valor con el que comenzaron.
 */
function Reset_Global_Variables() {
    arr_names_of_sections_with_id = new Array();

    table_current_index = 0;
    chart_current_index = 0;
}

/* ================================================== */
/* ================================================== */
/* ================================================== */
/*                                                    */
/*                                                    */
/*           BUILD IN-ARTICLE VISUAL STUFF            */
/*                                                    */
/*                                                    */
/* ================================================== */
/* ================================================== */
/* ================================================== */

/**
 * Construye una cita en formato HTML.
 *
 * @param {string} _quote_txt - Texto
 * citado acompañado por, si se desea,
 * el nombre del autor. La estructura
 * constará invariablemente de la cita
 * en primer término, seguida en segundo
 * lugar por el nombre del autor, en
 * caso de haberlo. Estos dos componentes
 * deberán estar divididos por '•'.
 *
 * Ej. "Elemental, mi querido Watson•Sherlock Holmes".
 *
 * @returns {string} - El contenido
 * HTML de la cita.
 */
function Build_Quote(_quote_txt) {
    let arr_quote = _quote_txt.split('•');

    if (arr_quote.length > 1) {
        let author = arr_quote[1];
        var html_author_quote = '<p class="author">' + '<b>— ' + author + '</b>' + '</p>';
    } else {
        var html_author_quote = '';
    }

    let quote = arr_quote[0];
    let html_quote_txt = '<p class="quote">' + '<b>' + quote + '</b>' + '</p>';

    // prettier-ignore
    let html_quote =
        '<blockquote>' +
            '<!---->' +
            html_quote_txt +
            '<!---->' +
            html_author_quote +
            '<!---->' +
        '</blockquote>';

    return html_quote;
}

let table_current_index = 0;

/**
 * Esta función construye una tabla en
 * formato HTML a partir de los datos
 * proporcionados.
 *
 * @param {string} _table_txt - Texto
 * que representa la tabla con sus
 * columnas, filas y valores. Estos
 * tres grupos (col, rows, val) deben
 * estar separados por "/". Asímismo,
 * los elementos de cada uno de estos
 * tres grupos, deben estar separados
 * por '•'.
 *
 * Ej. "Col1•Col2 / Row1•Row2 / Val1•Val2•Val3•Val4"
 *
 * @param {string} _table_title - Título
 * de la tabla.
 *
 * @returns {string} - El contenido HTM
 *  de la tabla.
 */
function Build_Table(_table_txt, _table_title) {
    table_current_index += 1;

    let arr_table_groups = _table_txt.split('/');

    if (arr_table_groups.length < 3) return '';

    let arr_col_labels = arr_table_groups[0].split('•');
    let arr_row_labels = arr_table_groups[1].split('•');
    let arr_val_table = arr_table_groups[2].split('•');

    // prettier-ignore
    let html_thead =
        '<thead>' +
            '<tr>' +
                '<th><!-- Bloque blanco de manera intencional --></th>' +
                arr_col_labels
                    .map(_label => '<th>' + _label + '</th>')
                    .join('') +
            '</tr>' +
        '</thead>';

    // prettier-ignore
    let html_tbody =
        '<tbody>' +
            arr_row_labels
                .map((_label, _row) => {
                    let html_row_values = '';

                    let first_val_idx = arr_col_labels.length * _row;
                    let last_val_idx = arr_col_labels.length * (_row + 1);

                    for (let _idx = first_val_idx; _idx < last_val_idx; _idx++) {
                        html_row_values += '<td>' + arr_val_table[_idx] + '</td>';
                    }

                    let html_row = 
                        '<tr>' +  
                            '<th>' + _label + '</th>' + 
                            html_row_values + 
                        '</tr>';

                    return html_row;
                })
                .join('') +
        '</tbody>';

    // prettier-ignore
    let html_table =
        '<pre class="table">' +
            '<p class="table_title">' + _table_title + '</p>' +
            '<table>' +
                html_thead +
                html_tbody +
            '</table>' +
        '</pre>';

    return html_table;
}

let chart_current_index = 0;

/**
 * Construye y devuelve un gráfico de
 * barras en formato HTML.
 *
 * @param {string} _bar_chart_txt - Texto
 * que representa los datos del gráfico
 * de barras. En este caso, las etiquetas
 * de las barras (siempre en primer lugar)
 * y sus valores, están separados por '/'.
 * Además, cada una de las etiquetas o
 * valores están separados por '•'.
 *
 * Ej. "Google•Meta•Amazon•Microsoft/2•5•6•8".
 *
 * @param {string} _chart_title - El
 * título del gráfico.
 *
 * @returns {string} - El contenido
 * HTML del gráfico de barras.
 */
function Build_Bar_Chart(_bar_chart_txt, _chart_title) {
    chart_current_index += 1;

    let arr_chart_groups = _bar_chart_txt.split('/');

    if (arr_chart_groups.length < 2) return '';

    let arr_labels = arr_chart_groups[0].split('•');
    let arr_values = arr_chart_groups[1].split('•');

    if (arr_labels.length != arr_values.length) return '';

    let max_value = Math.max(...arr_values);

    /*
     * La gráfica tiene 6 líneas horizontales
     * (generadas en CSS) que se extienden de
     * abajo (des de 0) hacia arriba (hasta 5).
     * Lo que hace que debamos generar 6 etiquetas
     * para el eje Y (`html_y_labels`). Estas
     * etiquetas deben comenzar en zero e irse
     * extendiendo hasta el valor máximo de la
     * gráfica con un incremento igual para todas.
     */
    let num_y_labels = 6;
    let increment_val_label = max_value / (num_y_labels - 1);

    // prettier-ignore
    let html_y_labels =
        '<div class="y_labels">' +
            [...Array(num_y_labels).keys()]
                .map(_idx => {
                    /*
                     * Comenzaremos desde la etiqueta que estará
                     * más arriba e iremos descendiendo hasta
                     * alcanzar el valor cero.
                     */
                    let idx_label = (num_y_labels - 1) - _idx;
                    let val = increment_val_label * idx_label;

                    return '<p>' + ~~val + '</p>';
                })
                .join('') +
        '</div>';

    // prettier-ignore
    let html_bars_container =
        '<ul class="bars_container">' +
            arr_labels
                .map((_label, _idx) => {
                    /*
                     * Calculamos el porcentaje que representa el
                     * valor de la barra actual con respecto al
                     * valor máximo de la gráfica.
                     */
                    let percentage_height = (arr_values[_idx] / max_value) * 100;

                    
                    let html_bar =
                        '<li>' +
                            '<span ' + 
                                'style="height:' + percentage_height +'%" ' + 
                                'title="' + _label +', ' + arr_values[_idx] + '"' +
                            '/>' +
                        '</li>';

                    return html_bar;
                })
                .join('') +
        '</ul>';

    // prettier-ignore
    let html_x_labels =
        '<ul class="x_labels">' +
            arr_labels
                .map(_label => 
                    '<li>' + 
                        '<p>' + 
                            '<b>' + _label + '</b>' + 
                        '</p>' + 
                    '</li>'
                )
                .join('') +
        '</ul>';

    // prettier-ignore
    let html_bar_chart =
        '<pre class="bar_chart_container">' +

            '<p class="chart_title">' + _chart_title + '</p>' +

            '<div class="chart_container">' +
                html_y_labels +
                '<div class="bars_and_x_labels_container">' +
                    html_bars_container +
                    html_x_labels +
                '</div>' +
            '</div>' +

        '</pre>';

    return html_bar_chart;
}

function Build_Circle_Chart(_circle_chart_txt, _chart_title) {
    chart_current_index += 1;

    // _circle_chart_txt: "100•80/Global Population•Facebook Users"
    // _chart_title: "Título"

    let arr_chart = _circle_chart_txt.split('/'); // ["100•80", "Global Population•Facebook Users"]

    let arr_values = arr_chart[0].split('•'); // ["100", "80"]
    let arr_tags = arr_chart[1].split('•'); // ["Global Population", "Facebook Users"]

    let bg_value = arr_values[0]; // "100"
    let fill_value = arr_values[1]; // "80"

    let bg_tag = arr_tags[0]; // "Global Population"
    let fill_tag = arr_tags[1]; // "Facebook Users"

    let percentage = (fill_value * 100) / bg_value; // 80

    // prettier-ignore
    let html_circle_chart =
        '<pre class="circle_chart_container">' +

            '<p class="chart_title">' + _chart_title + '</p>' +

            '<div class="chart_and_information_container">' +

                '<figure class="chart">' +
                    '<div class="middle_information">' +
                        '<p>' + ~~percentage + '%</p>' +
                    '</div>' +
                    '<svg>' +
                        '<circle class="background"></circle>' +
                        '<circle class="fill" style="--percentage: ' + percentage + '"></circle>' +
                    '</svg>' +
                '</figure>' +

                '<ul class="chart_information">' +
                    '<li class="background">' +
                        '<p class="name">' + bg_tag + '</p>' +
                        '<p class="value">' + bg_value + '</p>' +
                    '</li>' +
                    '<li class="fill">' +
                        '<p class="name">' + fill_tag + '</p>' +
                        '<p class="value">' + fill_value + '</p>' +
                    '</li>' +
                '</ul>' +

            '</div>' +

        '</pre>';

    return html_circle_chart;
}

/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/*                  DECORACIÓN EN TEXTO                  */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */

function add_reference_links(_txt) {
    return _txt.replace(/｢/g, '[<a class="reference">').replace(/｣/g, '</a>]');
}

function add_bold(_txt) {
    return _txt.replace(/【/g, '<b>').replace(/】/g, '</b>');
}

function add_italic(_txt) {
    return _txt.replace(/⟨/g, '<i>').replace(/⟩/g, '</i>');
}

/*                                                      */
/*                                                      */
/*                                                      */
/*                                                      */
/*                PROCESAR TEXTO PÁRRAFO                */
/*                                                      */
/*                                                      */
/*                                                      */
/*                                                      */

/**
 * @info Comprueba si el párrafo inicia con
 * ciertos caracteres especiales que señalan
 * una acción particular para transformar el
 * texto en contenido HTML.
 *
 * @param {string} _paragraph_txt - Texto del
 * párrafo que se va a procesar.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML generado a
 * partir del párrafo.
 */
function Process_Paragraph_Text(_paragraph_txt) {
    if (_paragraph_txt.startsWith('q>')) {
        /*
         * Si el párrafo comienza con 'q>', se
         * tratará como una cita y se convertirá
         * en un bloque de cita en formato HTML.
         */

        let quote_txt = _paragraph_txt.slice(2);

        let html_blockquote = Build_Quote(quote_txt);

        return html_blockquote;
    }
    //
    else if (_paragraph_txt.startsWith('t>')) {
        /*
         * Si el párrafo comienza con 't>',
         * el texto se convertirá en una tabla.
         */

        let txt = _paragraph_txt.slice(2);

        /*
         * Obtenemos el título y el texto que
         * formará la tabla.
         *
         * Estos estan separados por '|'.
         *
         * Ej. Compañias|Google•Meta•...
         */
        let arr_table = txt.split('|');

        if (arr_table.length < 2) return '';

        let table_title = arr_table[0];
        let table_txt = arr_table[1];

        let html_table = Build_Table(table_txt, table_title);

        return html_table;
    }
    //
    else if (_paragraph_txt.startsWith('g>')) {
        /*
         * Si el párrafo comienza con 'g>',
         * el texto se convertirá en un gráfico
         * de barras (formato HTML).
         */

        let txt = _paragraph_txt.slice(2);

        /*
         * Obtenemos el título y el texto que
         * formará el gráfico.
         *
         * Estos estan separados por '|'.
         *
         * Ej. Compañias|Google•Meta•...
         */
        let arr_chart = txt.split('|');

        if (arr_chart.length < 2) return '';

        let bar_chart_title = arr_chart[0];
        let bar_chart_txt = arr_chart[1];

        /* Generamos y devolvemos el gráfico. */
        let html_bar_chart = Build_Bar_Chart(bar_chart_txt, bar_chart_title);
        return html_bar_chart;
    }
    //
    else if (_paragraph_txt.startsWith('C>')) {
        let txt = _paragraph_txt.slice(2);

        let arr_chart = txt.split('|');

        if (arr_chart.length < 2) return '';

        let circle_chart_title = arr_chart[0];
        let circle_chart_txt = arr_chart[1];

        /* Generamos y devolvemos el gráfico. */
        let html_circle_chart = Build_Circle_Chart(circle_chart_txt, circle_chart_title);
        return html_circle_chart;
    } else {
        /*
         * Si el párrafo no comienza con ninguna
         * seqüència de caracteres especial,
         * el texto se procesará como un párrafo
         * normal.
         */

        let p_txt = _paragraph_txt;

        /*
         * Procesamos el texto para agregar
         * cualquier tipo de decoración al
         * propio texto.
         */
        p_txt = add_reference_links(p_txt);
        // p_text = add_bold(p_text);
        p_txt = add_italic(p_txt);
        // p_text = add_highlighted(p_text);
        // p_text = add_list(p_text);
        // p_text = add_enummeration(p_text);

        return '<p>' + p_txt + '</p>';
    }
}

/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/*                  CUERPO DEL ARTÍCULO                  */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */

/**
 * @info Genera y devuelve el resumen (_summary_)
 * del articulo.
 *
 * @param {string} _body_txt - Texto que contiene
 * el resumen del artículo.
 *
 * @return {string} - Cadena de texto que contiene
 * el contenido HTML del resumen.
 */
function Add_Summary(_body_txt) {
    /*
     * Obtenemos el _summary_ del articulo.
     *
     * El cual se encuentra entre "Ϡ:" y "‽".
     */
    let regex = /\Ϡ:(.*?)‽/;

    let summary = Find(_body_txt, regex);
    if (!summary) return '';

    let summary_id = Generate_ID('Summary');

    // prettier-ignore
    let html_summary =
        '<summary id="' + summary_id + '">' +

            '<p class="summary_title">Summary</p>' +
            '<p>' + summary + '</p>' +

        '</summary>';

    return html_summary;
}

/**
 * @info Genera y devuelve las secciones del artículo.
 *
 * @param {string} _body_txt - Texto que contiene las
 * secciones del artículo.
 *
 * @return {string} - Cadena de texto que contiene el
 * contenido HTML de las secciones.
 */
function Add_Sections(_body_txt) {
    /*
     * Expresión regular para buscar las
     * secciones del articulo.
     *
     * Las cuales se encuentran entre
     * "ϛ:" y "‽".
     */
    let regex = /ϛ:(.*?)‽/g;

    /*
     * Array para almacenar las
     * coincidencias de secciones
     * encontradas.
     */
    let array_sections = [];

    /*
     * Iteramos sobre el texto para
     * encontrar todas las secciones
     * y almacenarlas en el array
     * `array_sections`.
     */
    var match;
    while ((match = regex.exec(_body_txt)) != null) array_sections.push(match);

    /* Comprobamos que haya alguna sección. */
    if (array_sections.length == 0) return '';

    /*
     * Generamos el contenido HTML que compone
     * las secciones del artículo, incluyendo
     * párrafos, títulos y otros elementos.
     */
    let html_content = array_sections
        .map((_section, _index) => {
            if (_section.length < 1) return '';

            /*
             * Fragmento de texto que se necesita
             * convertir a formato HTML.
             */
            let section_txt = _section[1];

            /*
             * Array que guarda las distintas partes
             * de la sección, separadas por "¶".
             */
            let arr_split_txt = section_txt.split('¶');

            if (arr_split_txt.length < 1) return '';

            /*
             * El primer elemento del array es el
             * título de la sección.
             */
            let title_section = arr_split_txt[0];

            /*
             * Generamos el contenido HTML que
             * forma el título de la sección.
             */
            let html_title_section =
                '<h4 class="title_section">' +
                (_index + 1) +
                '.&nbsp;&nbsp;&nbsp;' +
                title_section +
                '</h4>';

            /*
             * Los demás elementos de `arr_split_txt`
             * (todos excepto el primero) constituyen
             * los párrafos del artículo.
             */
            let arr_paragraphs = arr_split_txt.slice(1, arr_split_txt.length);

            /*
             * Generamos el contenido HTML que
             * incluyetodos los distintos párrafos
             * de la sección.
             */
            let html_paragraphs = arr_paragraphs
                .map(paragraph_txt => {
                    /**
                     * Procesamos el párrafo y devolvemos
                     * el contenido HTML que hayamos obtenido.
                     */
                    return Process_Paragraph_Text(paragraph_txt);
                })
                .join('');

            /*
             * Generamos el ID específico para
             * la sección que está siendo
             * procesada.
             */
            let id = Generate_ID(title_section);

            /*
             * Devolvemos el contenido HTML de
             * la sección.
             */
            return (
                '<section id="' + id + '">' + html_title_section + html_paragraphs + '</section>'
            );
        })
        .join('');

    return html_content;
}

/**
 * @info Construye y devuelve el contenido
 * HTML del cuerpo del artículo.
 *
 * @param {string} _body_txt - Texto del
 * artículo que se utilizará para construir
 * el contenido del cuerpo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML del cuerpo
 * del artículo.
 */
function Build_Body(_body_txt) {
    let html_body_content = Add_Summary(_body_txt) + Add_Sections(_body_txt);

    return '<div class="article_body">' + html_body_content + '</div>';
}

/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/*                ENCABEZADO DEL ARTÍCULO                */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */

function Add_Backward_Link() {
    // prettier-ignore
    let html_backward_link =
        '<a class="backward_link">' +
            '<!---->' +
            'Return to Homepage' +
            '<!---->' +
            '<svg class="arrow_icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                '<g>' +
                    '<circle></circle>' +
                    '<path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>' +
                '</g>' +
            '</svg>' +
            '<!---->' +
        '</a>';

    return html_backward_link;
}

/**
 * @info Devuelve el título del artículo en
 * formato HTML.
 *
 * @param {string} _header_txt - Texto que
 * contiene el título del artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML del título
 * del artículo.
 */
function Add_Title(_header_txt) {
    /*
     * Obtenemos el titulo de articulo.
     *
     * Este se encuentra entre "T:" y "‽".
     *
     * Ej. T:Centralización del Poder‽
     */
    let title = Find(_header_txt, /\T:(.*?)‽/);

    if (!title) return '';

    return '<h2 class="title">' + title + '</h2>';
}

/**
 * @info Devuelve el subtítulo del artículo
 * en formato HTML.
 *
 * @param {string} _header_txt - Texto que
 * contiene el subtítulo del artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML del subtítulo
 * del artículo.
 */
function Add_Subtitle(_header_txt) {
    /*
     * Obtenemos el subtitulo del articulo.
     *
     * Este se encuentra entre "Ts:" y "‽".
     *
     * Ej. Ts:Meta, Google y Twitter‽
     */
    let subtitle = Find(_header_txt, /\Ts:(.*?)‽/);

    if (!subtitle) return '';

    let html_subtitle = '<h3 class="subtitle">' + subtitle + '</h3>';

    return html_subtitle;
}

/**
 * @info Agrega los autores del artículo
 * al contenido HTML.
 *
 * @param {string} _header_txt - Texto que
 * contiene los autores del artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML de los
 * autores del artículo.
 */
function Add_Authors(_header_txt) {
    /*
     * Obtenemos los autores del articulo.
     *
     * Los autores se encuentra entre "A:" y "‽";
     * y, todos ellos, están separados por "&".
     *
     * Ej. A:Roger Rovira&Peter Parker&Ai Haibara‽
     */
    let arr_authors = Find(_header_txt, /\A:(.*?)‽/, '&');

    if (!arr_authors) return '';

    // prettier-ignore
    let html_authors =
        '<p class="authors">' +

            'By ' +
            arr_authors
                .map(_author => {
                    return '<span>' + _author + '</span>';
                })
                .join(' & ') +

        '</p>';

    return html_authors;
}

/**
 * @info Agrega la fecha de publicación
 * del artículo al contenido HTML.
 *
 * @param {string} _header_txt - Texto que
 *  la fecha del artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML de la fecha
 * de publicación del artículo.
 */
function Add_Release_Date(_header_txt) {
    /*
     * Array que guarda la fecha del artículo.
     *
     * Dicha fecha está comprendida entre "ϝ:" y "‽";
     * y el mes y el año estan separados por "-".
     *
     * Ej. ϝ:11-2023‽
     */
    let arr_date = Find(_header_txt, /\ϝ:(.*?)‽/, '-');

    if (!arr_date && arr_date.length < 1) return '';

    let arr_months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    let month_num = arr_date[0];

    /* El número del mes, debe estar entre 1 y 12. */
    if (month_num > 13 || month_num < 1) return '';

    /* Obtenemos el año y el nombre del mes. */
    let month_name = arr_months[month_num - 1];
    let year = arr_date[1];

    /* Generamos y devolvemos el elemento HTML. */
    return '<p class="release_date">' + month_name + ' ' + year + '</p>';
}

/**
 * @info Devuelve la información adicional
 * sobre el artículo en formato HTML.
 *
 * @param {string} _header_txt - Texto que
 * contiene la información adicional del
 * artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML de la
 * información adicional.
 */
function Add_Extra_Information(_header_txt) {
    // prettier-ignore
    return (
        '<div class="extra_information">' +

            Add_Authors(_header_txt) +
            Add_Release_Date(_header_txt) +

        '</div>'
    );
}

/**
 * @info Generamos y devolvemos el contenido
 * HTML para el encabezado del articulo.
 *
 * @param {string} _header_txt - Texto que se
 * utilizará para construir el contenido del
 * encabezado del artículo.
 *
 * @returns {string} - Cadena de texto que contiene
 * el contenido HTML del encabezado del artículo.
 */
function Build_Header(_header_txt) {
    let header_id = Generate_ID('Header');

    // prettier-ignore
    let html_header =
        '<header id="' + header_id + '">' +
            '<!---->' +
            Add_Backward_Link() +
            '<!---->' +
            Add_Title(_header_txt) +
            '<!---->' +
            // Add_Subtitle(_header_txt) +
            // '<!---->' +
            Add_Extra_Information(_header_txt) +
            '<!---->' +
        '</header>';

    return html_header;
}

/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/*                  TABLA DE CONTENIDOS                  */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */

/**
 * @info Construye y devuelve el contenido
 * HTML para la tabla de contenidos del
 * artículo.
 *
 * @return {string} - Cadena de texto que
 * contiene el contenido HTML de la tabla
 * de contenidos.
 */
function Build_Table_Of_Contents() {
    /*
     * Recorremos `array_sections_with_id` y
     * generamos los enlaces con los que el
     * usuario podrá navegar a las diferentes
     * secciones o contenidos del artículo.
     */
    let html_links_to_sections = arr_names_of_sections_with_id
        .map(_sec_name => {
            // prettier-ignore
            let content =
                '<li>' +
                    '<a>' +
                        _sec_name +
                    '</a>' +
                '</li>';

            return content;
        })
        .join('');

    // prettier-ignore
    let html_table_of_contents =         
        '<nav class="table_contents">' +

            '<p class="title">In This Article</p>' +

            '<ul class="contents">' +
                html_links_to_sections +
            '</ul>' +

        '</nav>';

    return html_table_of_contents;
}

/*                                                        */
/*                                                        */
/*                                                        */
/*                                                        */
/*                    CÓDIGO PRINCIPAL                    */
/*                                                        */
/*                                                        */
/*                                                        */
/*                                                        */

/**
 * @info Devuelve los _topics_ del artículo
 * en formato HTML.
 *
 * @param {string} _header_txt - Texto que
 * contiene los temas del artículo. Estos
 * deben encuentrase entre "C:" y "‽"; y
 * estar separados por "&".
 *
 * Ej. "C:Technology&Politics&Monopolization‽".
 *
 * @return {string} Cadena de texto que
 * contiene el contenido HTML con los
 * temas del artículo.
 */
function Add_Topics(_header_txt) {
    let arr_topics = Find(_header_txt, /\C:(.*?)‽/, '&');

    // prettier-ignore
    let html_topics = 
        '<ul class="topics">' +

            arr_topics
                .map(topic => {
                    let html_topic = 
                        '<li class="topic">' + 
                            '<p>' + topic + '</p>' +
                        '</li>'

                    return html_topic;
                })
                .join('') +

        '</ul>'

    return html_topics;
}

function Build_Footer(_header_txt) {
    // prettier-ignore
    let html_footer =
        '<footer>' +

            Add_Topics(_header_txt) +

            '<a class="back_to_top">' +
                '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                    '<g>' +
                        '<path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>' +
                    '</g>' +
                '</svg>' +
            '</a>' +

        '</footer>';

    return html_footer;
}

/**
 * @info Construye y agrega un artículo
 * HTML a la interfaz.
 *
 * @param {string} _article_txt - Texto que se
 * utilizará para construir el contenido del
 * artículo.
 */
function Build_HTML_Article(_article_txt) {
    Reset_Global_Variables();

    /*
     * Separador que divide el encabezado
     * del cuerpo del texto.
     */
    let split_txt = ']$[';

    let header_txt = _article_txt.substring(0, _article_txt.indexOf(split_txt));
    let body_txt = _article_txt.substring(_article_txt.indexOf(split_txt) + split_txt.length);

    // prettier-ignore
    let html_article =
        '<article>' +

            Build_Header(header_txt) +

            '<div class="container">' +
                Build_Body(body_txt) +
                Build_Table_Of_Contents() +
            '</div>' +

            Build_Footer(header_txt) +

        '</article>';

    document
        .querySelector('.query_result_container')
        .insertAdjacentHTML('afterbegin', html_article);
}

export default Build_HTML_Article;
