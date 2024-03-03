function AddGoTopButton() {
    // prettier-ignore
    let go_top =
        '<a class="back_to_top">' +
            '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                '<g>' +
                    '<path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>' +
                '</g>' +
            '</svg>' +
        '</a>';

    return go_top;
}

export function Footer() {
    let footer = '<footer>' + AddGoTopButton() + '</footer>';
    return footer;
}
