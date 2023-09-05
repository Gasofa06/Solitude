import {
    Build_Circle_Chart,
    Build_Bar_Chart,
    Build_Table,
    Build_Quote,
} from './visual_kit/__kit.js';

import { TextDecorator } from '../../__helpers__/text_decorator.js';

import { Split_Title_From_Content } from './splitter.js';

/**
 * @info Genera y devuelve los párrafos de la sección.
 *
 * @param {Array[String]} _arr_paragraphs - Lista que contiene los diversos
 * textos de los diferentes párrafos de la sección del artículo.
 *
 * @return {string} - Cadena de texto que contiene todos los párrafos
 * en formato HTML de las secciones.
 */
export function Get_Section_Paragraphs(_arr_paragraphs) {
    let html_paragraphs = _arr_paragraphs
        .map(_paragraph => Process_Paragraph(_paragraph))
        .join('');

    return html_paragraphs;
}

/**
 * @info Comprueba si el párrafo inicia con ciertos caracteres especiales
 * que señalan una acción particular para transformar el texto en contenido HTML.
 *
 * @param {string} _paragraph_txt - Texto del párrafo que se va a procesar.
 *
 * @return {string} - Cadena de texto que contiene el contenido HTML generado
 * a partir del párrafo.
 */
export function Process_Paragraph(_paragraph) {
    var result = '';

    switch (true) {
        case _paragraph.startsWith('q>'):
            /*
             * Si el párrafo comienza por 'q>', se tratará como una cita y se
             * convertirá tal.
             */
            let quote = _paragraph.slice(2);
            let html_blockquote = Build_Quote(quote);

            result = html_blockquote;

            break;

        case _paragraph.startsWith('t>'):
            /*
             * Si el párrafo comienza por 't>', el texto se convertirá en
             * una tabla. El título de la tabla y el texto que la formará,
             * estan separados por '|'.
             */
            var paragraph = _paragraph.slice(2);

            var splited_paragraph = Split_Title_From_Content(paragraph, '|');

            if (!!splited_paragraph) {
                let table_title = splited_paragraph['title'];
                let table_content = splited_paragraph['content'];

                let html_table = Build_Table(table_title, table_content);

                result = html_table;
            }

            break;

        case _paragraph.startsWith('g>'):
            /*
             * Si el párrafo comienza con 'g>', el texto se convertirá en un
             * gráfico de barras. El título del gráfico y el texto que lo formará,
             * estan separados por '|'.
             */
            var paragraph = _paragraph.slice(2);

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

        case _paragraph.startsWith('C>'):
            /*
             * Si el párrafo comienza con 'C>', el texto se convertirá en un gráfico
             * de círculo. El título del gráfico y el texto que lo formará, estan
             * separados por '|'.
             */
            var paragraph = _paragraph.slice(2);

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
            /*
             * Si el párrafo no comienza con ninguna seqüència de caracteres
             * especial, el texto se procesará como un párrafo normal.
             */
            var paragraph = _paragraph;

            let decorator_text = new TextDecorator(paragraph);
            decorator_text.all();

            paragraph = decorator_text.get_text();

            result = `<p>${paragraph}</p>`;

            break;
    }

    return result;
}
