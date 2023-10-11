export function Process_Title(_title) {
    let processed_title = _title
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    return processed_title;
}
