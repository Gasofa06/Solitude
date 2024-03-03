function DetectTheme() {
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

DetectTheme();
