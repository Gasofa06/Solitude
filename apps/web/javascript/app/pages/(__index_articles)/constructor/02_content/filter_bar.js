export function Add_Filter_Bar() {
    let circle_intersectio_svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">' +
        '<circle cx="13.5" cy="10.5" r="5" />' +
        '<circle cx="7.5" cy="10.5" r="5" />' +
        '</svg>';

    let dropdown_arrow_svg =
        '<svg xmlns:xlink="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
        '<path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" />' +
        '</svg>';

    return (
        '<div class="filter_bar">' +
        `<button class="filter">${dropdown_arrow_svg}</button>` +
        `<button class="intersection">${circle_intersectio_svg}</button>` +
        '</div>'
    );
}
