async function Add_Gradients() {
    const response = await fetch('reusable/gradients.html');

    if (response.ok) {
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);

        return;
    } else {
        console.log("Error, the gradients couldn't be found.");

        return;
    }
}

Add_Gradients();
