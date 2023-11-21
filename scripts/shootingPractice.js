let points = 0;
let missed = 0;

$(document).ready(() =>  {
    var cancel = setInterval(createCircle, 3000);
});

function createCircle(){
    console.log(missed);
    let top = Math.floor(Math.random() * 75) + 10;
    let left = Math.floor(Math.random() * 90);
    let size = Math.floor(Math.random() * 100) + 60;
    $("#gameZone").append('<div class="target" style="width:' + size + 'px; height:' + size + 'px; position: absolute; top: ' + top + '%; left: ' + left + '%;"></div>');

    var deleteCircle = setInterval(myCircle => {
        missed += 1;
        $("#timer").html("Missed: " + missed);
        myCircle.remove();
    }, 3000, $(".target:last-of-type"));

    $(".target:last-of-type").on("click", clicked.bind($(".target:last-of-type"), deleteCircle) );
}

function clicked(stopMiss){
    points += 1;
    $("#points").html("Points: " + points);
    clearInterval(stopMiss);
    this.remove();
}

function deleteCircle(myCircleircle){
    myCircle.remove();
}