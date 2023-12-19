const indexPage = "http://127.0.0.1:5500/GameMiniverse/index.html";
const gameId = 2;

let currentState = "";
let assistDictionary = ["COCHE", "CASA", "TRAGAPERRAS", "LAGUNA", "MADRE", "ZAPATO", "ELEFANTE", "DRAGON", "JARRA", "HAMSTER", "RADIO", "AZUL", "INTERESANTE", "SILLA", "PARQUE", "REY", "PIE", "SAL", "AMBULANCIA", "ARAÑA"];
let dictionary2 = ["HA", "HU"];
let dictionary;
let word = "";
let stage = 1;
let puntos = 0;

$(document).ready(function(){
    fetch("https://api.generadordni.es/v2/text/words?results=50&words=1&language=es") //Esta es una api que genera palabras aleatorias, si no las encuentra hace uso del diccionario de repuesto
      .then( body => {
        return body.json();
      }).then( data => {
        if(Array.isArray(data)){
            dictionary = data.slice();
        }
        else{
            dictionary = assistDictionary.slice();
        }
        startGame();
      })
    $("#btnBckToTitle").on("click", () => {
        window.location.href = indexPage;
    });
})

function generateStringVisually(word){
    let insertString = "";
    for (let index = 0; index < word.length; index++) {
        if(word.charAt(index) == " "){
            insertString += "<div class='letter'><h1>  </h1></div>";
            continue;
        }
        insertString += "<div class='letter'><h1>" + currentState.charAt(index) + "</h1></div>";
    }
    $("#word").html(insertString);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function startGame(){
    currentState = "";
    stage = 1;
    word = dictionary[Math.floor(Math.random() * dictionary.length)];
    word = word.toUpperCase();
    word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log(word);
    for (let index = 0; index < word.length; index++) {
        currentState += "_";
    }
    generateStringVisually(word);
    $(".correct").removeClass("correct");
    $(".wrong").removeClass("wrong");

    $(".keyboardLetter").off("click"); //Remove remaining clicks and add new ones
    $(".keyboardLetter").on("click", buttonAction);

    $("#hangedMan img:first-of-type").attr("src", "assets/images/HangedMan/HangedMan" + stage + ".png");
    $("#gameInfo h1:last-of-type").text("Fallos: " + (stage - 1) + "/9"); //Reset visual cues
}

function buttonAction(event){
    $(event.currentTarget).off("click");
    let found = false;
    let letterClicked = event.target.innerText;
    for (let index = 0; index < word.length; index++) {
        if(word.charAt(index) == letterClicked){
            currentState = setCharAt(currentState, index, letterClicked);
            generateStringVisually(word);
            event.target.classList.add("correct");
            found = true;
        }
    }
    if(!found){
        event.target.classList.add("wrong");
        stage += 1;
        $("#gameInfo h1:last-of-type").text("Fallos: " + (stage - 1) + "/9");
        if(stage > 9){
            storeHighScore();

            $("#finishScreen").css("visibility", "visible");
            $(".keyboardLetter").off("click");
            return;
        }
        $("#hangedMan img:first-of-type").attr("src", "assets/images/HangedMan/HangedMan" + stage + ".png");
    }
    else if(currentState == word){
        puntos += 1;
        $("#gameInfo h1:first-of-type").text("Puntos: " + puntos);
        $(".keyboardLetter").off("click");
        setTimeout(startGame, 1000);
    }
}

function storeHighScore(){
    if(sessionStorage.getItem("logId") != null){
        let highscoreBody = {
            userId:1,
            score:puntos
        };
        fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/games/" + gameId + "/highScores", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(highscoreBody),
        })
        .then(response => {
            if (!response.ok) {
                console.log(response.status);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
}