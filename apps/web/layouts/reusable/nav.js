async function Add_Navigation_Bar() {
    const response = await fetch('http://solitude.com/reusable/nav.html');

    if (response.ok) {
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);

        return;
    } else {
        console.log("Error, the navigation bar couldn't be found.");

        return;
    }
}

Add_Navigation_Bar();

// /**
//  * @info Actualiza el aspecto visual de la página y, si es posible,
//  * guarda un nuevo estilo predeterminado en el `localStorage` del
//  * usuario para que se mantenga incluso cuando cierre el navegador.
//  */
// Toggle_Theme = () => {
//     let theme = document.documentElement.getAttribute('theme');
//
//     if (theme === 'light') theme = 'dark';
//     else if (theme === 'dark') theme = 'light';
//
//     document.documentElement.setAttribute('theme', theme);
//
//     try {
//         localStorage.setItem('data-theme', theme);
//     } catch (_error) {
//         alert(_error);
//     }
// };
