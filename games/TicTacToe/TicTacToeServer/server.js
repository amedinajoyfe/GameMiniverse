const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let roomCounts = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomCode) => {

        let room = io.sockets.adapter.rooms.get(roomCode);
        if (!room) {
            socket.join(roomCode);
            room = io.sockets.adapter.rooms.get(roomCode);
            console.log(`Room ${roomCode} created`);
        }
        if (room.size < 2) {
            socket.join(roomCode);
            console.log(`User joined room ${roomCode}`);

            if (!roomCounts[roomCode]) {
                roomCounts[roomCode] = "---------";
            }

            if(room.size == 1)
                io.to(roomCode).emit('assignSign', 'o');
            else
                io.to(roomCode).emit('assignSign', 'x'); 
        } else {
            socket.emit('roomFull');
        }
    });

    socket.on('signPlaced', (index, currentRoom, sign) => {
        let strArray = roomCounts[currentRoom].split('');

        strArray[index] = sign;

        roomCounts[currentRoom] = strArray.join('');
        console.log("Tablero: " + roomCounts[currentRoom]);
        let winner = checkWinner(roomCounts[currentRoom]);
        io.to(currentRoom).emit('boardChanged', index, sign);
        console.log("Ganador: " + winner);
        if(winner != '-')
        {
            if(winner == 't')
            {
                io.to(currentRoom).emit('tie');
            }
            else
            {
                io.to(currentRoom).emit('finishedGame', winner);
                roomCounts[currentRoom] = "---------";
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function checkWinner(board) {
    let checkTie = true;
    for(let i = 0; i < 9; i ++)
    {
        if(board[i] == '-')
        {
            checkTie = false;
        }
    }
    if(checkTie)
    {
        return 't';
    }

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return '-';
}
