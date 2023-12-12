const indexPage = "http://127.0.0.1:5500/GameMiniverse/index.html";

let currentState = "";
let assistDictionary = ["COCHE", "CASA", "TRAGAPERRAS", "LAGUNA", "MADRE", "ZAPATO", "ELEFANTE", "DRAGON", "JARRA", "HAMSTER", "RADIO", "AZUL", "INTERESANTE", "SILLA", "PARQUE", "REY", "PIE", "SAL", "AMBULANCIA", "ARAÑA"];
let dictionary2 = ["HA", "HU"];
let dictionary;
let word = "";
let stage = 1;
let puntos = 0;

$(document).ready(function(){
    fetch("https://api.generadordni.es/v2/text/words?results=50&words=1") //Esta es una api que genera palabras aleatorias, si no las encuentra hace uso del usuario de repuesto
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
            $("#finishScreen").css("visibility", "visible");
            $(".keyboardLetter").off("click");
            return;
        }
        $("#hangedMan img:first-of-type").attr("src", "assets/images/HangedMan/HangedMan" + stage + ".png");
    }
    else if(currentState == word){
        puntos += 1;
        $("#gameInfo h1:first-of-type").text("Puntos: " + puntos);
        alert("Has completado la palabra");
        $(".keyboardLetter").off("click");
        setTimeout(startGame, 1000);
    }
}