const NAVIGATION_TOP_BAR = document.createElement('template');

NAVIGATION_TOP_BAR.innerHTML = `
<link rel="stylesheet" type="text/css" href="styles/components/nav.css" />

<nav class="nav_top_bar">
  <div class="nav_top_bar_content">
    <div class="nav_left">
      <a class="platform_name">incognito dB</a>
    </div>

    <div class="nav_center">
      <ul class="nav_links">
        <li><a>Search</a></li>

        <li><a>About</a></li>

        <li><a>Features</a></li>

        <li><a>Write</a></li>
      </ul>
    </div>

    <div class="nav_right">
      <div class="switch_theme" id="switch_theme_container">
        <label class="switch">
          <input type="checkbox" id="switch_theme_toggle" />

          <div class="slider">
            <span>Light</span>
            <span>Dark</span>
          </div>
        </label>
      </div>

      <div class="lang_dropdown">
        <div class="lang_dropdown_btn">
          <div>
            <svg class="internet_globe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
              <g>
                <circle cx="9" cy="9" r="8"></circle>
                <ellipse cx="9" cy="9" rx="2.8" ry="8"></ellipse>
                <path d="m1 9h16"></path>
              </g>
            </svg>
          </div>

          <a class="selected_lang">En</a>
        </div>

        <ul class="lang_menu">
          <li class="lang_item" data-lang="En"></li>
          <li class="lang_item" data-lang="En"></li>
          <li class="lang_item" data-lang="En"></li>
        </ul>
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
