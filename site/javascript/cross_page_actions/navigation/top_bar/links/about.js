/**
 * @info Cierra la página del artículo y la página con todos los
 * artículos de la búsqueda en caso de estar abiertas. Luego
 * redirecciona al usuario al apartado About de la página.
 */
export const Click_Navbar_About = () => {
    if (window.page_controller.in_article_page()) {
        window.page_controller.go_main_page();
    }

    if (window.page_controller.in_index_articles_page()) {
        window.page_controller.go_main_page();
    }

    window.about_container.scrollIntoView({ behavior: 'smooth' });
};
