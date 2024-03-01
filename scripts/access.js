const indexPage = "http://127.0.0.1:5501/index.html";
// Token https://sepolia.etherscan.io/tx/0x6f6d0bbfd92493682ce17197d1ba20f30f9b475ed095fa93955d0a0a7e454379
const contractAddress = "0x75c674C9f0442fbdE8C38477eEec465B0A202a8e";
const abi = [
	{
		"inputs": [
			{
				"internalType": "contract MiniToken",
				"name": "_myToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "NotApproved",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserNotFound",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserNotOwner",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256",
				"name": "gameId",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "GameStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "RegisterRequired",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "addAchievement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "checkInList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_score",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_prize",
				"type": "uint256"
			}
		],
		"name": "endGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "findUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "findUserName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getGameScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_score",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "loginAttempt",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "achievements",
						"type": "uint256[]"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "highScoreReferences",
						"type": "uint256[]"
					}
				],
				"internalType": "struct GamesMiniverse.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_registeredUser",
				"type": "address"
			}
		],
		"name": "registerNewUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_id",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "startGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewContractName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
let web3;
let contract;
let accounts;

$(document).ready(function() {
    $(".changeToRegister").on('click', () => {
        changeState(true);
    });
    $(".changeToLogin").on('click', () => {
        changeState(false);
    });
    $("#loginEthereum").on('click', async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    contract = new web3.eth.Contract(abi, contractAddress);
                    const result = await contract.methods.loginAttempt(accounts[0]).call();
                    console.log(result);
                    if (result[1] == "") {
                        $("#registerContainerWeb3").removeClass("notDisplay");
                        $('#loginContainer').addClass("notDisplay");
                        clearInputs();
                    } else {
                        logInWeb3(result[1], accounts[0]);
                    }
                } else {
                    console.log('No account connected');
                }
            } catch (error) {
                console.error('User denied account access:', error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            // Fallback to a local provider
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    });
    $('#btnLogin').on('click', checkLoginValues);
    $('#btnRegister').on('click', checkRegisterValues);
    $('#btnRegisterWeb3').on('click', checkRegisterWeb3Values);
});

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
            if(response.status == 409){
                $('#errorTextRegister').text("Nombre de usuario ya registrado").removeClass("notDisplay");
                return;
            }
            else{
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        $("#btnRegister").off("click"); 
        $("#btnRegister").addClass("notDisplay");
        $("#successTextRegister").removeClass("notDisplay");
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
        return response.json();
    })
    .then(data => {
        sessionStorage.clear();
        sessionStorage.setItem("session", "Web2");
        sessionStorage.setItem("logId", data.id);
        sessionStorage.setItem("logName", data.username);
        window.location.href = indexPage;
    })
    .catch(error => {
        text.text("Hubo un error inesperado, inténtelo de nuevo más tarde");
        console.error('Fetch error:', error);
    });
}

async function checkRegisterWeb3Values(){
    let message = "";
    let text = $('#errorTextRegisterWeb3');
    let username = $('#userRegisterWeb3').val();
    text.removeClass("notDisplay");

    if(username == ""){
        message = "Debes completar el nombre de usuario";
    }
    else if(username.length < 4){
        message = "El nombre de usuario debe tener como mínimo 4 caracteres";
    }
    else{
        message = "";
    }
    
    text.text(message);
    if(message != "")
        return;

    try {
        console.log("Paso 1");
        const gasLimit = 30000;
        console.log("Paso 2");
        const result = await contract.methods.registerNewUser(username).send({ from: accounts[0], gas: gasLimit });
        console.log("Paso 3");
        logInWeb3(username, accounts[0]);
        console.log("Paso 4");
    } catch (error) {
        console.error('Unexpected error registering user');
    }
}

function logInWeb3(_username, _address){
    sessionStorage.clear();
    sessionStorage.setItem("session", "Web3");
    sessionStorage.setItem("logId", _address);
    sessionStorage.setItem("logName", _username);
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
    $("#registerContainerWeb3").addClass("notDisplay");
    clearInputs();
}

function clearInputs(){
    let inputs = $("input:not([type='button'])");
    for(input of inputs){
        input.value = "";
        $(input).prop('checked', false);
    }
}