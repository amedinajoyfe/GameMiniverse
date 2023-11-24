let points = 0;
let missed = 0;
let speed = 2600;
const limit = 600;
const speedIncrease = 200;
const cricleAnimSpeed = 2000;
const indexPage = "http://127.0.0.1:5500/GameMiniverse/index.html";

$(document).ready(() =>  {
    setTimeout(createCircle, speed);  //Mirar setTimeOut vs setInterval para las funciones
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
    points += 1;
    $("#points").html("Puntos: " + points);
    clearTimeout(stopMiss);
    this.remove();
}

function deleteCircle(myCircleircle){
    myCircle.remove();
}