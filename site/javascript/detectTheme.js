/**
 *
 */
function detect_color_scheme() {
    /* Almacenar el tema actual. */
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

detect_color_scheme();
