/**
 * @info Función para manejar el
 * evento de desplazamiento (_scroll_).
 */
export function Article_Scroll() {
    if (
        window.aricle_sections.length < 1 ||
        window.table_contents_links.length < 1
    ) {
        return;
    }

    let current_scroll_Y_position = window.scrollY;

    /*
     * Recorre cada sección del articulo
     * para determinar cuál está en la
     * vista del usuario.
     */
    window.aricle_sections.forEach((section, index) => {
        let section_height = section.clientHeight;
        let section_top_position = section.offsetTop;

        /*
         * Verificamos si la posición actual
         * de desplazamiento está dentro de
         * los límites de la sección actual.
         */
        if (
            current_scroll_Y_position >= section_top_position - 12 &&
            current_scroll_Y_position <
                section_top_position + section_height - 12
        ) {
            /*
             * Si la sección está en la vista,
             * remueve la clase "active" de todos
             * los enlaces de navegación.
             */
            window.table_contents_links.forEach(a =>
                a.classList.remove('active'),
            );

            /*
             * Agrega la clase "active" al enlace
             * de navegación que corresponde a la
             * sección actual.
             */
            window.table_contents_links[index].classList.add('active');

            return;
        }
    });
}
