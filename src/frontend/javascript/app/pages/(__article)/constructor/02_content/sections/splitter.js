/**
 * @info Divide el texto dado en un título y un contenido basado en un
 * carácter de separación especificado.
 *
 * @param {string} _txt - El texto de entrada que se va a dividir.
 * @param {string} _separation - El carácter o cadena de separación.
 *
 * @returns {Object|undefined} Un objeto que contiene el título y el
 * contenido, o undefined si ocurre un error.
 */
export const Split_Title_From_Content = (_txt, _separation) => {
    let arr_split_txt = _txt.split(_separation);

    if (arr_split_txt.length >= 2) {
        let title = arr_split_txt[0];
        let content = arr_split_txt[1];

        return { title: title, content: content };
    } else {
        alert('Error when trying to split the title from the content.');
        return;
    }
};
