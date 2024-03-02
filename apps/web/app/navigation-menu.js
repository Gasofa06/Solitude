let Toggle_Theme = () => {
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

let CloseMobileNavigation = (menu, name) => {
    if (menu.classList.contains(name)) {
        menu.classList.remove(name);
    }
};

let ToggleMobileNavigation = (menu, name) => {
    menu.classList.toggle(name);
};

function SetMobileNavigation() {
    let class_name = 'mobile-menu__opened';
    let navigation_menu = document.getElementById('navigation-menu');

    let mobile__checkbox = document.getElementById('mobile__menu-input');
    mobile__checkbox.addEventListener('change', () =>
        ToggleMobileNavigation(navigation_menu, class_name),
    );

    addEventListener('resize', () =>
        CloseMobileNavigation(navigation_menu, class_name),
    );
}

// TODO
function SetToggleTheme() {}

async function AddNavigationMenu() {
    const response = await fetch('http://192.168.1.201/reusable/nav.html');

    if (response.ok) {
        let menu = await response.text();
        let body = document.body;

        body.insertAdjacentHTML('beforeBegin', menu);

        SetMobileNavigation();
        SetToggleTheme();

        return;
    }

    console.log("Error, the navigation bar couldn't be found.");
}

function Main() {
    AddNavigationMenu();
}

Main();
