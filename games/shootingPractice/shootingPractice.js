const limit = 500;
const speedIncrease = 150;
const cricleAnimSpeed = 2000;
const indexPage = "http://127.0.0.1:5502/index.html";
const gameId = 1;

let puntos = 0;
let missed = 0;
let speed = 2600;

$(document).ready(() =>  {
    setTimeout(createCircle, speed);  //Mirar setTimeOut vs setInterval para las funciones

    $("#btnBckToTitle").on("click", () => {
        window.location.href = indexPage;
    });

    $(".backArrow").on("click", () => {
        storeHighScore();
    });
});

function createCircle(){
    let size = Math.floor(Math.random() * 120) + 50;
    let top = Math.floor(Math.random() * 80);
    let left = Math.floor(Math.random() * 80);
    let newDiv = $('<div class="target" style="width:' + size + 'px; height:' + size + 'px; top: ' + top + '%; left: ' + left + '%;"></div>');
    $("#gameZone").append(newDiv);

    var deleteCircle = setTimeout(myCircle => {
        missed += 1;
        if(missed <= 3)
            $("#missed").html("Fallos: " + missed);
        myCircle.remove();
    }, cricleAnimSpeed, newDiv);

    $(".target:last-of-type").on("click", clicked.bind($(".target:last-of-type"), deleteCircle) ); // Pass parameter to function using bind
    
    if(speed > limit)
    {
        speed -= speedIncrease;
    }
    if(missed > 2){
        storeHighScore();

        $(".target").remove();
        $("#finishScreen").css("visibility", "visible");
        return;
    }
    setTimeout(createCircle, speed); // Look into changing animation time from js
    $("#btnBckToTitle").on("click", () => {
        window.location.href = indexPage;
    });
}

function clicked(stopMiss){
    puntos += 1;
    $("#points").html("Puntos: " + puntos);
    clearTimeout(stopMiss);
    this.remove();
}

function deleteCircle(myCircleircle){
    myCircle.remove();
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