async function Add_Navigation_Bar() {
    const resp = await fetch('navigation-bar.html');
    const html = await resp.text();
    document.body.insertAdjacentHTML('afterend', html);
}

Add_Navigation_Bar();

/**
 * @info Actualiza el aspecto visual de la página y, si es posible,
 * guarda un nuevo estilo predeterminado en el `localStorage` del
 * usuario para que se mantenga incluso cuando cierre el navegador.
 */
Toggle_Theme = () => {
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
