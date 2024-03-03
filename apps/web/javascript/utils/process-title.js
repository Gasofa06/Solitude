export function ProcessTitle(title) {
    let processed_title = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    return processed_title;
}
