let GetPageName = () => {
    let script = document.querySelector('script#load');
    let name = '⋆ ' + script.getAttribute('name');
    return name;
};

async function AddLoading() {
    const response = await fetch('http://192.168.1.201/reusable/loading.html');

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;
        let main = body.getElementsByTagName('main')[0];

        let name = GetPageName();
        layout = layout.replace('</h2>', name + '</h2>');

        main.insertAdjacentHTML('beforebegin', layout);

        return;
    }

    console.log("Error, the loading layout couldn't be found.");
}

function Main() {
    AddLoading();
}

Main();
