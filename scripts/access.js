$(document).ready(function() {
    $("#changeToRegister").on('click', () => {
        $('#loginContainer').addClass("hidden");
        $('#registerContainer').removeClass("hidden");
    })
    $("#changeToLogin").on('click', () => {
        $('#registerContainer').addClass("hidden");
        $('#loginContainer').removeClass("hidden");
    })
})