function AddContentsMenu() {
    let arr_sections = window.identifier_coordinator.get_sections_with_id();

    let sections_links = arr_sections
        .map(_sec_name => {
            let link = `<a>${_sec_name}</a>`;
            return `<li>${link}</li>`;
        })
        .join('');

    let table_of_contents =
        '<nav class="contents-menu">' +
        '<div>' +
        '<p>Content Menu</p>' +
        '<ul>' +
        sections_links +
        '</ul>' +
        '</div>' +
        '</nav>';

    return table_of_contents;
}

function AddSectionTitle(num, title) {
    let section_title = '<h3>' + `${num}.&nbsp;&nbsp;&nbsp;${title}` + '</h3>';
    return section_title;
}

class TextDecorator {
    constructor(text) {
        this.text = text;
    }

    bold() {
        this.text = this.text.replace(/【/g, '<b>').replace(/】/g, '</b>');
    }

    italic() {
        this.text = this.text.replace(/⟨/g, '<i>').replace(/⟩/g, '</i>');
    }

    reference_links() {
        this.text = this.text
            .replace(/｢/g, '[<a class="reference">')
            .replace(/｣/g, '</a>]');
    }

    all() {
        this.bold();
        this.italic();
        this.reference_links();
    }

    get_text() {
        return this.text;
    }
}

let Split_Title_From_Content = (txt, separation) => {
    let arr_split_txt = txt.split(separation);

    if (arr_split_txt.length >= 2) {
        let title = arr_split_txt[0];
        let content = arr_split_txt[1];

        return { title: title, content: content };
    } else {
        alert('Error when trying to split the title from the content.');
        return;
    }
};

function Build_Table(_table_title, _table_content) {
    let arr_table_groups = _table_content.split('/');

    if (arr_table_groups.length < 3) return '';

    let arr_col_labels = arr_table_groups[0].split('•');
    let arr_row_labels = arr_table_groups[1].split('•');
    let arr_val_table = arr_table_groups[2].split('•');

    let col_labels = arr_col_labels
        .map(_label => `<th>${_label}</th>`)
        .join('');

    // prettier-ignore
    let thead =
        '<thead>' +
            '<tr>' +
                '<th></th>' +
                col_labels +
            '</tr>' +
        '</thead>';

    // prettier-ignore
    let tbody =
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

    let title = '<p class="table_title">' + _table_title + '</p>';

    let table =
        '<pre class="table">' +
        title +
        `<table>${thead}${tbody}</table>` +
        '</pre>';

    return table;
}

function Build_Quote(_quote_txt) {
    let arr_quote = _quote_txt.split('•');

    if (arr_quote.length > 1) {
        let author = arr_quote[1];

        var html_author_quote =
            '<p class="author">' + '<b>— ' + author + '</b>' + '</p>';
    } else {
        var html_author_quote = '';
    }

    let quote = arr_quote[0];
    let html_quote = '<p class="quote">' + '<b>' + quote + '</b>' + '</p>';

    let blockquote =
        '<blockquote>' + html_quote + html_author_quote + '</blockquote>';

    return blockquote;
}

function Build_Circle_Chart(_chart_title, _circle_chart_txt) {
    // _circle_chart_txt: "100•80/Global Population•Facebook Users"
    // _chart_title: "Título"

    let arr_chart = _circle_chart_txt.split('/'); // ["100•80", "Global Population•Facebook Users"]

    console.log(_circle_chart_txt);
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

function Build_Bar_Chart(_chart_title, _bar_chart_txt) {
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

function ProcessParagraph(paragraph) {
    var result = '';

    switch (true) {
        case paragraph.startsWith('q>'):
            /*
             * Si el párrafo comienza por 'q>', se tratará como una cita y se
             * convertirá tal.
             */
            let quote = paragraph.slice(2);
            let html_blockquote = Build_Quote(quote);

            result = html_blockquote;

            break;

        case paragraph.startsWith('t>'):
            /*
             * Si el párrafo comienza por 't>', el texto se convertirá en
             * una tabla. El título de la tabla y el texto que la formará,
             * estan separados por '|'.
             */
            var paragraph = paragraph.slice(2);

            var splited_paragraph = Split_Title_From_Content(paragraph, '|');

            if (!!splited_paragraph) {
                let table_title = splited_paragraph['title'];
                let table_content = splited_paragraph['content'];

                let html_table = Build_Table(table_title, table_content);

                result = html_table;
            }

            break;

        case paragraph.startsWith('g>'):
            /*
             * Si el párrafo comienza con 'g>', el texto se convertirá en un
             * gráfico de barras. El título del gráfico y el texto que lo formará,
             * estan separados por '|'.
             */
            var paragraph = paragraph.slice(2);

            var splited_paragraph = Split_Title_From_Content(paragraph, '|');

            if (!!splited_paragraph) {
                let chart_title = splited_paragraph['title'];
                let chart_content = splited_paragraph['content'];

                let html_bar_chart = Build_Bar_Chart(
                    chart_title,
                    chart_content,
                );

                result = html_bar_chart;
            }

            break;

        case paragraph.startsWith('C>'):
            /*
             * Si el párrafo comienza con 'C>', el texto se convertirá en un gráfico
             * de círculo. El título del gráfico y el texto que lo formará, estan
             * separados por '|'.
             */
            var paragraph = paragraph.slice(2);

            var splited_paragraph = Split_Title_From_Content(paragraph, '|');

            if (!!splited_paragraph) {
                let chart_title = splited_paragraph['title'];
                let chart_content = splited_paragraph['content'];

                let html_circle_chart = Build_Circle_Chart(
                    chart_title,
                    chart_content,
                );

                result = html_circle_chart;
            }

            break;

        default:
            let decorator_text = new TextDecorator(paragraph);
            decorator_text.all();

            paragraph = decorator_text.get_text();

            result = `<p>${paragraph}</p>`;
            break;
    }

    return result;
}

function AddSectionParagraphs(arr_paragraphs) {
    let paragraphs = arr_paragraphs
        .map(paragraph => ProcessParagraph(paragraph))
        .join('');

    return paragraphs;
}

function AddSections(body) {
    // La secciones se encuentran entre "ϛ:" y "‽".
    let regex = /ϛ:(.*?)‽/g;
    let arr_sections = [];

    var match;

    while ((match = regex.exec(body)) !== null) {
        if (match.length > 1) {
            arr_sections.push(match[1]);
        } else {
            alert('No section data found.');
        }
    }

    if (arr_sections.length === 0) {
        console.log('The current article does not have any section.');
        return 'Error';
    }

    // Los párrafos se separan por: "¶". El primero de éstos, es el título del artículo.
    let sections = '';

    arr_sections.forEach((sec, idx) => {
        let arr = sec.split('¶');

        if (arr.length < 2) {
            alert('The current section is empty.');
            return 'Error';
        }

        let title = arr[0];
        let arr_paragraphs = arr.slice(1, arr.length);

        let id = window.identifier_coordinator.generate_section_id(title);

        sections +=
            `<section id="${id}">` +
            AddSectionTitle(idx + 1, title) +
            AddSectionParagraphs(arr_paragraphs) +
            '</section>';
    });

    return sections;
}

function AddArticle(body) {
    let article = '<article>' + AddSections(body) + '</article>';
    return article;
}

export function Body(article_body) {
    let body =
        '<div>' +
        AddArticle(article_body) +
        AddContentsMenu(article_body) +
        '</div>';

    return body;
}
