let points = 0;
let missed = 0;
let speed = 2600;
let limit = 600;

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
    }, 2000, newDiv);

    $(".target:last-of-type").on("click", clicked.bind($(".target:last-of-type"), deleteCircle) );
    
    if(speed > limit)
    {
        speed -= 200;
    }
    if(missed > 2){
        $(".target").remove();
        return;
    }
    setTimeout(createCircle, speed); // Look into changing animation time from js
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

function testLoss(stopGame){
    if(missed > 3){
        clearTimeout(stopGame);
    }
}