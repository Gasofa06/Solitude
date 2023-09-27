class ThemeObserverBase extends HTMLElement {
    constructor() {
        super();

        this.observer = new MutationObserver(
            this.Handle_Theme_Switch.bind(this),
        );

        // Configure the observer to watch for changes to the 'theme' attribute
        const observerConfig = { attributes: true, attributeFilter: ['theme'] };

        // Start observing the 'body' element
        this.observer.observe(document.body, observerConfig);
    }

    Theme_Change_Observer(_mutations_list) {
        for (const mutation of _mutations_list) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'theme'
            ) {
                const newThemeValue = mutation.target.getAttribute('theme');
                // Handle the theme change here
                this.onThemeChange(newThemeValue);
            }
        }
    }

    // Method to be overridden by subclasses to handle theme changes
    onThemeChange(newThemeValue) {
        // This is a placeholder method to be implemented in subclasses
        console.log(`Theme changed to: ${newThemeValue}`);
    }

    // Clean up the observer when the element is removed from the DOM
    disconnectedCallback() {
        this.observer.disconnect();
    }
}

// Define a custom element using the base class
customElements.define('theme-observer-base', ThemeObserverBase);
