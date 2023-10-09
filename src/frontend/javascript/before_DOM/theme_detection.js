/**
 * @info Esta función detecta y aplica automáticamente el esquema de
 * colores del tema del sitio web antes de cargar los elementos HTML,
 * evitando parpadeos incómodos de blanco a negro en la página.
 */
function Detect_Theme_Scheme() {
    let theme = 'light';

    if (localStorage.getItem('data-theme')) {
        if (localStorage.getItem('data-theme') == 'dark') {
            theme = 'dark';
        }
    } else if (!window.matchMedia) {
        return;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }

    document.documentElement.setAttribute('theme', theme);
}

Detect_Theme_Scheme();
