export function StartLoading(msg) {
    window.search_bar.readOnly = true;

    window.make_query.disabled = true;
    window.make_query.classList.add('loading');

    console.log(msg);
}

export function StopLoading(msg) {
    window.search_bar.readOnly = false;

    window.make_query.disabled = false;
    window.make_query.classList.remove('loading');

    console.log(msg);
}
