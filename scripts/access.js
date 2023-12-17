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
    text.removeClass("notDisplay");

    if(username == ""){
        message = "Debes completar el nombre de usuario";
    }
    else if(username.length < 4){
        message = "El nombre de usuario debe tener como mínimo 4 caracteres";
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

    text.text(message);
}

function checkRegisterValues(){
    let message = "";
    let text = $('#errorTextRegister');
    let username = $('#userRegister').val();
    let email = $('#emailRegister').val();
    let password = $('#passRegister').val();
    text.removeClass("notDisplay");

    if(username == ""){
        message = "Debes completar el nombre de usuario";
    }
    else if(username.length < 4){
        message = "El nombre de usuario debe tener como mínimo 4 caracteres";
    }
    // else if(email.length < 8){
    //     message = "El email debe tener como mínimo 8 caracteres";
    // }
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

    text.text(message);
}

function registerUser(_username, _email, _password){
    let text = $('#errorTextLogin');
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
        setTimeout(() => window.location.reload(), 2000);
    })
    .catch(error => {
        text.text("Hubo un error inesperado, inténtelo de nuevo más tarde");
        console.error('Fetch error:', error);
    });
}

function logIn(_username, _password){
    let text = $('#errorTextLogin');
    let userData = {
        username: _username,
        password: _password,
    };

    fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                text.text("Usuario y/o contraseña inválidos");
                return;
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        sessionStorage.clear();
        sessionStorage.setItem("logId", response.id);
        sessionStorage.setItem("logName", _username);
        window.location.href = indexPage;
    })
    .catch(error => {
        text.text("Hubo un error inesperado, inténtelo de nuevo más tarde");
        console.error('Fetch error:', error);
    });
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