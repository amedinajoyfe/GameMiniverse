$(document).ready(() =>  {
    var cancel = setInterval(createCircle, 2000);
});

function createCircle(){
    $(".target").remove();
    let top = Math.floor(Math.random() * 75) + 10;
    let left = Math.floor(Math.random() * 90);
    let size = Math.floor(Math.random() * 100) + 60;
    // $("#gameZone").html('<div class="target" style="position: absolute; top: 50%; left: 30%;"></div>');
    $("#gameZone").append('<div class="target" style="width:' + size + 'px; height:' + size + 'px; position: absolute; top: ' + top + '%; left: ' + left + '%;"></div>');
}