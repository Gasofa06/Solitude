function Main() {
    Header_Animation();
}

function Header_Animation() {
    window.addEventListener(
        'scroll',

        function (_e) {
            let section_height =
                document.getElementById('section-hero').offsetHeight;
            let hero_content = document.getElementById('hero-content');

            if (this.scrollY + hero_content.offsetHeight < section_height) {
                hero_content.style.visibility = 'visible';
            } else {
                hero_content.style.visibility = 'hidden';
                return;
            }

            let scale = (section_height - this.scrollY / 1.6) / section_height;
            hero_content.style.transform = 'scale(' + scale + ')';

            let opacity = (section_height - this.scrollY) / section_height;
            hero_content.style.opacity = opacity;
        },

        false,
    );
}

Main();
