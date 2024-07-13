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

let OnScroll = (name, menu, footer) => {
    let offest = 642;
    let y = window.scrollY;

    let footer_height = footer.clientHeight;
    let footer_top = footer.offsetTop;

    if (y >= footer_top - offest && y < footer_top + footer_height - offest) {
        menu.classList.add(name);
    } else if (menu.classList.contains(name)) {
        menu.classList.remove(name);
    }
};

function SetFooterDetection() {
    let class_name = 'footer-detected';
    let navigation_menu = document.getElementById('navigation-menu');
    let footer = document.getElementById('footer-page');

    window.addEventListener('scroll', () =>
        OnScroll(class_name, navigation_menu, footer),
    );
}

export async function AddNavigationMenu() {
    const response = await fetch(
        'http://192.168.0.100:80/reusable/navigation-menu.html',
    );

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;

        body.insertAdjacentHTML('beforebegin', layout);

        SetMobileNavigation();
        SetToggleTheme();
        SetFooterDetection();

        return;
    }

    console.log("Error, the navigation bar couldn't be found.");
}
