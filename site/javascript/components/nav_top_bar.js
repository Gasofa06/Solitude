const NAVIGATION_TOP_BAR = document.createElement('template');

NAVIGATION_TOP_BAR.innerHTML = `
    <link rel="stylesheet" type="text/css" href="css/nav.css" />

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
        this.shadow_root = this.attachShadow({ mode: 'closed' });
        this.shadow_root.appendChild(NAVIGATION_TOP_BAR.content);

        this.Initialize_Events();
    }

    Initialize_Events() {
        this.shadow_root.getElementById('switch_theme_toggle').onclick = () => {
            this.Toggle_Theme();
        };

        this.observer = new MutationObserver(
            this.Theme_Change_Observer.bind(this),
        );

        this.observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['theme'],
        });
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

    Theme_Change_Observer(_mutations_list) {
        let mutation_record = _mutations_list[0];

        if (
            mutation_record.type !== 'attributes' &&
            mutation_record.attributeName !== 'theme'
        ) {
            return;
        }

        let new_theme = mutation_record.target.getAttribute('theme');

        this.On_Theme_Switch(new_theme);
    }

    On_Theme_Switch(_theme) {
        this.shadow_root
            .getElementById('main_container')
            .setAttribute('theme', _theme);
    }
}

customElements.define('comp-nav-top-bar', Comp__NavTopBar);
