export async function AddFooter() {
    const response = await fetch(
        'http://192.168.0.100:80/reusable/footer.html',
    );

    if (response.ok) {
        let layout = await response.text();
        let body = document.body;

        body.insertAdjacentHTML('afterend', layout);
        return;
    }

    console.log("Error, the footer couldn't be found.");
}
