const counterDisplay = document.querySelector('.counter');
const incrementBtn = document.getElementById('incrementBtn');
const socket = io('http://localhost:3000');

let sign;
let currentRoom = '';

$(document).ready(function() {

    $('#incrementBtn').on('click', () => {
        socket.emit('increment', currentRoom);
    });

    $('#btnJoinRoom').on('click', () => {
        const roomCode = $('#txtRoomCode').val();
        if (roomCode) {
            socket.emit('joinRoom', roomCode);
            currentRoom = roomCode;
        }
    });

    $('.imageContainer').on('click', function() {
        if($(this).css('background-image') !== 'none')
            return;
        var index = $('.imageContainer').index(this);
        $(this).css('background-image', 'url("assets/' + sign + '.png")');
        socket.emit('signPlaced', index, currentRoom, sign);
    });
    $('#btnBckToTitle').click(function() {
        window.location.href = '../../index.html'; // Replace 'new_page.html' with the URL of the page you want to navigate to
    });
});

socket.on('boardChanged', (index, placedSign) => {
    $('.imageContainer').eq(index).css('background-image', 'url("assets/' + placedSign + '.png")');
    console.log("Entrando en board changed: " + placedSign + ", my sign: " + sign);
    if(sign != placedSign)
    {
        $("#waitingSection").css("visibility", "hidden");
    }
    else{
        $("#waitingSection").css("visibility", "visible");
    }
});
socket.on('assignSign', assignedSign => {
    if(sign != undefined)
    {
        $("#waitingSection").css("visibility", "hidden");
        return;
    }
    sign = assignedSign;
    $("#lobby").css("visibility", "hidden");
    $("#game").css("visibility", "visible");
    $("#waitingSection").css("visibility", "visible");
});
socket.on('roomFull', () => {
    $("#errorRoomTxt").removeClass("hidden");
});
socket.on('finishedGame', winningSign => {
    if(winningSign == sign)
        $('#result').text("HAS GANADO!!!");
    else
        $('#result').text("HAS PERDIDO...");

    $("#finishScreen").css("visibility", "visible");
    $("#waitingSection").css("visibility", "hidden");
    $("#game").css("visibility", "hidden");
});