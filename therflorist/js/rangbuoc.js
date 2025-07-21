$(document).ready(function () {
    var hoaModal = new bootstrap.Modal(document.getElementById('hoamodal'));
    hoaModal.show();

    $('#hoamodal form').on('submit', function(e) {
        e.preventDefault(); 
        hoaModal.hide();    
        
    });
});