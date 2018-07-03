// game.js for node-browser-game

// code from https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b

// initialize socket 
var socket = io();

/* RECIEVE MESSAGE FROM SERVER
// For Testing: to verify recieving messages, log messages
socket.on('message', function(data) {
    console.log(data);
});
*/

// RECORDING MOVEMENT (KEY PRESSES)
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 87: // W
            movement.up = true;
            break;
        case 65: // A
            movement.left = true;
            break;
        case 83: // S
            movement.down = true;
            break;
        case 68: //D
            movement.right = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 87: // W
            movement.up = false;
            break;
        case 65: // A
            movement.left = false;
            break;
        case 83: // S
            movement.down = false;
            break;
        case 68: //D
            movement.right = false;
            break;
    }
});

// SEND MESSAGE
// alert server that new player has joined
socket.emit('new player');

// a loop that sends keyboard input to server 60 times a second
setInterval(function() {
    socket.emit('movement', movement);
}, 1000/60);

//RECIEVE ALL PLAYERS STATUS FROM SERVER
// this is accessing the canvas in index.html
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
// every time state message recieved, game clears canvas and redraws all the players as green circles
socket.on('state', function(players) {
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    for (var id in players) {
        var player = players[id];
        //console.log("X = " + player.x);
        //console.log("Y = " + player.y);
        context.beginPath();
        context.arc(player.x, player.y, 30, 0, 2 * Math.PI);
        context.fill();
    }
});

