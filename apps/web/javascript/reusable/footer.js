export async function AddFooter() {
    const response = await fetch('http://192.168.1.201/reusable/footer.html');

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;
        let main = body.getElementsByTagName('main')[0];

        main.insertAdjacentHTML('afterend', layout);

        return;
    }

    console.log("Error, the footer couldn't be found.");
}
