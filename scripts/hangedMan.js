$(document).ready(function(){
    let word = "palabra y no";
    let insertString = "";
    for (let index = 0; index < word.length; index++) {
        if(word.charAt(index) == " "){
            insertString += "<div class='letter'><h1> </h1></div>";
            continue;
        }
        insertString += "<div class='letter'><h1>_</h1></div>";
    }
    $("#word").html(insertString);
})