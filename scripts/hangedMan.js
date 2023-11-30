let insertString = "";
let currentState = "";
let word = "PALABRA LOCO";
$(document).ready(function(){
    for (let index = 0; index < word.length; index++) {
        currentState += "_";
    }
    generateStringVisually(word);
    $("#word").html(insertString);

    $(".keyboardLetter").on("click", event => {
        let letterClicked = event.target.innerText;
        for (let index = 0; index < word.length; index++) {
            if(word.charAt(index) == letterClicked){
                currentState = currentState.setCharAt(currentState, index, 'g');
                alert(currentState);
            }
        }
    })
})

function generateStringVisually(word){
    for (let index = 0; index < word.length; index++) {
        if(word.charAt(index) == " "){
            insertString += "<div class='letter'><h1> </h1></div>";
            continue;
        }
        insertString += "<div class='letter'><h1>" + currentState.charAt(index) + "</h1></div>";
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}