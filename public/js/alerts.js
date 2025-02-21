// ==> Alerta mesaje de exito 
function alert_success(message) {

    let alert = `
        <div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
            <div>
                ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.getElementById('alerts').innerHTML += alert

    $(".alert").delay(8000).slideUp(0, function() {
        $(this).alert('close');
    });

}

// ==> Alerta mesaje de fallo
function alert_danger(message) {
    let alert = `
        <div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#check-circle-fill"/></svg>
            <div>
                ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.getElementById('alerts').innerHTML += alert

    $(".alert").delay(8000).slideUp(0, function() {
        $(this).alert('close');
    });
}
