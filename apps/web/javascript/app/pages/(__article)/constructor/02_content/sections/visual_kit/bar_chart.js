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
export function Build_Bar_Chart(_chart_title, _bar_chart_txt) {
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
