const indexPage = "http://127.0.0.1:5502/index.html";
// Token https://sepolia.etherscan.io/tx/0x6f6d0bbfd92493682ce17197d1ba20f30f9b475ed095fa93955d0a0a7e454379
const contractAddress = "0xf90aAff097Dc1489C76918Bc2Dd28525b7774eCd";
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
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
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
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
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
];
const tokenAddress = "0xD62abf628434D84B94E1BE0926841307b73aAa54";
const tokenAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "ERC2612ExpiredSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC2612InvalidSigner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currentNonce",
				"type": "uint256"
			}
		],
		"name": "InvalidAccountNonce",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
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
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "TokensApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "TokensMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "customApprove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "customTransferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
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
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
let web3;
let contract;
let token;
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
					const address = accounts[0];
					const message = "Login to MyWebsite";
                	const signature = await web3.eth.personal.sign(message, address, "");
                    contract = new web3.eth.Contract(abi, contractAddress);
                    token = new web3.eth.Contract(tokenAbi, tokenAddress);
                    const result = await contract.methods.loginAttempt(address).call();
                    const tokenAmount = await token.methods.balanceOf(address).call();
                    if (result[1] == "") {
                        $("#registerContainerWeb3").removeClass("notDisplay");
                        $('#loginContainer').addClass("notDisplay");
                        clearInputs();
                    } else {
                        logInWeb3(result[1], address, tokenAmount);
                    }
                } else {
                    console.log('No account connected');
                }
            } catch (error) {
                console.error('User denied account access:', error);
            }
        }
        else {
            console.log('Debes utilizar MetaMask');
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
        const gasLimit = 30000;
        await contract.methods.registerNewUser(username).send({ from: accounts[0], gas: gasLimit });
		const tokenAmount = await token.methods.balanceOf(address).call();
        logInWeb3(username, accounts[0], tokenAmount);
    } catch (error) {
        console.error('Unexpected error registering user');
    }
}

function logInWeb3(_username, _address, _tokens){
    sessionStorage.clear();
    sessionStorage.setItem("session", "Web3");
    sessionStorage.setItem("logId", _address);
    sessionStorage.setItem("logName", _username);
    sessionStorage.setItem("tokens", _tokens / 1000000000000000000);
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