async function Add_Footer() {
    const resp = await fetch('footer.html');
    const html = await resp.text();
    document.body.insertAdjacentHTML('beforeend', html);
}

Add_Footer();
