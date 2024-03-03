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

let ToggleTheme = () => {
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

function SetToggleTheme() {
    let laptop__checkbox = document.querySelector(
        '.laptop__toggle-theme input',
    );
    let mobile__checkbox = document.querySelector(
        '.mobile__toggle-theme input',
    );

    [laptop__checkbox, mobile__checkbox].forEach(obj =>
        obj.addEventListener('change', () => ToggleTheme()),
    );
}

async function AddNavigationMenu() {
    const response = await fetch(
        'http://192.168.1.201/reusable/navigation-menu.html',
    );

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;
        let main = body.getElementsByTagName('main')[0];

        main.insertAdjacentHTML('beforebegin', layout);

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
