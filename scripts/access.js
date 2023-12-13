$(document).ready(function() {
    fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/games/1")
    .then( body => {
        return body.json();
    }).then( data => {
        console.log(data);
    })
    $("#changeToRegister").on('click', () => {
        changeState(true);
    });
    $("#changeToLogin").on('click', () => {
        changeState(false);
    });
    $('#btnLogin').on('click', checkLoginValues);
})

function checkLoginValues(){
    let text = $('#errorTextLogin');
    text.removeClass("notDisplay");
    let username = $('#userLogin').val();
    let password = $('#passLogin').val();
    if(username == ""){
        text.text("Debes completar el nombre de usuario");
    }
    else if(password == ""){
        text.text("Debes completar la contraseña");
    }
    else if(username.length < 8){
        text.text("El nombre de usuario debe tener como mínimo 8 caracteres");
    }
    else if(password.length < 8){
        text.text("La contraseña debe tener como mínimo 8 caracteres");
    }
    else{
        text.addClass("notDisplay");
    }
}

function changeState(value){
    if(value){
        $('#loginContainer').addClass("notDisplay");
        $('#registerContainer').removeClass("notDisplay");
        $('#errorTextLogin').addClass("notDisplay");
    } else{
        $('#registerContainer').addClass("notDisplay");
        $('#loginContainer').removeClass("notDisplay");
        $('#errorTextLogin').addClass("notDisplay");
    }
    clearInputs();
}

function clearInputs(){
    let inputs = $("input:not([type='button'])");
    for(input of inputs){
        input.value = "";
        $(input).prop('checked', false);
    }
}