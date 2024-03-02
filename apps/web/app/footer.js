async function Add_Footer() {
    const response = await fetch('http://192.168.1.201/reusable/footer.html');

    if (response.ok) {
        const html = await response.text();
        document.body.insertAdjacentHTML('afterend', html);

        return;
    } else {
        console.log("Error, the footer couldn't be found.");

        return;
    }
}

Add_Footer();
