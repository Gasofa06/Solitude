const NAVIGATION_TOP_BAR = document.createElement('template');

NAVIGATION_TOP_BAR.innerHTML = `
    <link rel="stylesheet" type="text/css" href="styles/components/nav.css" />

    <nav class="top_bar" id="main_container">
        <div class="nav_content">
            <div class="left">
                <a class="logo">incognito dB</a>
            </div>

            <div class="right">
                <ul class="nav_links">
                    <li id="search">
                        <a>Search</a>
                    </li>
            
                    <li id="about">
                        <a>About</a>
                    </li>
            
                    <li id="faqs">
                        <a>FAQs</a>
                    </li>
                </ul>

                <div class="switch_theme" id="switch_theme_container">
                    <label class="switch">
                        <input type="checkbox" id="switch_theme_toggle" />
              
                        <div class="slider">
                            <span>Light</span>
                            <span>Dark</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </nav>
`;

class Comp__NavTopBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let shadow_root = this.attachShadow({ mode: 'closed' });
        shadow_root.appendChild(NAVIGATION_TOP_BAR.content);

        this.Initialize_Events(shadow_root);
    }

    Initialize_Events(_shadow_root) {
        _shadow_root.getElementById('switch_theme_toggle').onclick = () => {
            this.Toggle_Theme();
        };
    }

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
}

customElements.define('comp-nav-top-bar', Comp__NavTopBar);
