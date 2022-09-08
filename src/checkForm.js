export function checkForm(elem, regex, error) {
    let tooltip = bootstrap.Tooltip.getOrCreateInstance(elem);
    if (!regex.test(elem.value)) {
        tooltip.dispose()
        tooltip = new bootstrap.Tooltip(elem);
        elem.setAttribute('data-bs-toggle', 'tooltip');
        elem.setAttribute('data-bs-title', error);
        elem.setAttribute('data-bs-placement', 'right');
        if (elem.value.length < 2)
            tooltip.dispose();
        else
            tooltip.show();
            document.getElementById('inscriptionSubmit').disabled = true;
        }
    else {   
        tooltip.dispose();
        document.getElementById('inscriptionSubmit').disabled = false;
    }
}