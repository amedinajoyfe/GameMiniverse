import userSession from './userSession.js';
const indexPage = "http://127.0.0.1:5500/GameMiniverse/index.html";

$(document).ready(function() {
    $("#changeToRegister").on('click', () => {
        changeState(true);
    });
    $("#changeToLogin").on('click', () => {
        changeState(false);
    });
    $('#btnLogin').on('click', checkLoginValues);
    $('#btnRegister').on('click', checkRegisterValues);
})

function checkLoginValues(){
    let message = "";
    let text = $('#errorTextLogin');
    let username = $('#userLogin').val();
    let password = $('#passLogin').val();

    if(username == ""){
        message = "Debes completar el nombre de usuario";
    }
    else if(username.length < 8){
        message = "El nombre de usuario debe tener como mínimo 8 caracteres";
    }
    else if(password == ""){
        message = "Debes completar la contraseña";
    }
    else if(password.length < 8){
        message = "La contraseña debe tener como mínimo 8 caracteres";
    }
    else{
        message = "";
        logIn(username, password);
    }

    text.removeClass("notDisplay");
    text.text(message);
}

function checkRegisterValues(){
    let message = "";
    let text = $('#errorTextRegister');
    let username = $('#userRegister').val();
    let email = $('#emailRegister').val();
    let password = $('#passRegister').val();
    if(username == ""){
        message = "Debes completar el nombre de usuario";
    }
    else if(username.length < 8){
        message = "El nombre de usuario debe tener como mínimo 8 caracteres";
    }
    else if(email == ""){
        message = "Debes completar el email";
    }
    else if(email.length < 8){
        message = "El email debe tener como mínimo 8 caracteres";
    }
    else if(password == ""){
        message = "Debes completar la contraseña";
    }
    else if(password.length < 8){
        message = "La contraseña debe tener como mínimo 8 caracteres";
    }
    else if(!$('#termsRegister').prop('checked')){
        message = "Debes aceptar los términos y condiciones";
    }
    else{
        message = "";
        registerUser(username, email, password);
    }

    text.removeClass("notDisplay");
    text.text(message);
}

function registerUser(_username, _email, _password){
    let userData = {
        username: _username,
        email: _email,
        password: _password,
    };

    fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function logIn(_username, _password){
    // fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/users", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData),
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.error('Fetch error:', error);
    // });
    userSession.username = _username;
    userSession.loggedIn = true;
    alert(userSession.username);
    alert(userSession.loggedIn);
    window.location.href = indexPage;
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