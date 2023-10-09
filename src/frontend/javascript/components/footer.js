const FOOTER = document.createElement('template');

FOOTER.innerHTML = `
    <link rel="stylesheet" type="text/css" href="css/components/footer.css" />

    <footer>
        <div class="footer_container">
            <a class="logo">incognito dB</a>

            <ul class="footer_links">
                <li>
                    <a>Search</a>
                </li>

                <li>
                    <a>Documentation</a>
                </li>

                <li href="https://github.com/Gasofa06/incognito-db">
                    <a>GitHub</a>
                </li>

                <li>
                    <a href="https://twitter.com/rovi_roger">X</a>
                </li>
            </ul>
        </div>
    </footer>
`;

class Comp__Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.shadow_root = this.attachShadow({ mode: 'closed' });
        this.shadow_root.appendChild(FOOTER.content);
    }
}

customElements.define('comp-footer', Comp__Footer);
