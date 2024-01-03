/**
 * @info Actualiza el aspecto visual de la página y, si es posible,
 * guarda un nuevo estilo predeterminado en el `localStorage` del
 * usuario para que se mantenga incluso cuando cierre el navegador.
 */
export const Toggle_Theme = () => {
    let theme = document.documentElement.getAttribute('theme');

    if (theme === 'light') theme = 'dark';
    else if (theme === 'dark') theme = 'light';

    document.documentElement.setAttribute('theme', theme);

    try {
        localStorage.setItem('data-theme', theme);
    } catch (_error) {
        alert(_error);
    }
};
