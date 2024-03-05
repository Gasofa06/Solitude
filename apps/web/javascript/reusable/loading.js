let GetPageName = () => {
    let script = document.getElementById('reusable-components');
    let name = '⋆ ' + script.getAttribute('name');
    return name;
};

export async function AddLoading() {
    const response = await fetch('http://192.168.1.201/reusable/loading.html');

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;

        let name = GetPageName();
        layout = layout.replace('</h2>', name + '</h2>');

        body.insertAdjacentHTML('beforebegin', layout);
        return;
    }

    console.log("Error, the loading layout couldn't be found.");
}
