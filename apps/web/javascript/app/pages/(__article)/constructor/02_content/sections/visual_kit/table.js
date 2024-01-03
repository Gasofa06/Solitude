/**
 * @info Construye una tabla en formato HTML a partir de los datos
 * proporcionados.
 *
 * @param {string} _table_title - Título de la tabla.
 * @param {string} _table_content - Texto que representa la tabla con sus
 * columnas, filas y valores. Estos tres grupos (col, rows, val) deben
 * estar separados por "/". Asímismo, los elementos de cada uno de estos
 * grupos, deben estar separados por '•'.
 *
 * ej. Col1•Col2 / Row1•Row2 / Val1•Val2•Val3•Val4
 *
 * @returns {string} - El contenido HTML de la tabla.
 */
export function Build_Table(_table_title, _table_content) {
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
                '<th><!-- Bloque blanco de manera intencional --></th>' +
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
