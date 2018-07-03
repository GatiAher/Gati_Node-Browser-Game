// server.js for node-browser-game

// code from https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b

// DEPENDANCIES
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

// CREATE OBJECTS
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// SETTING UP PORT AND SERVING STATIC FILES

// assign pair
app.set('port', 5000);

/* 
* express.static can load files from __dirname + '/static' directory
* middleware function (express.static) is mounted on the /static path. 
*/
app.use(express.static(__dirname + '/static'));

// ROUTING
// Thus the anonymous function is executed for any type of HTTP request on the / path.
app.get('/', function(request, response) {
    // anonymous function
    // transfer the file at the given path
    // join - joins all arguments togther and normalizes resulting path, arguments must be strings
    // sending html file to '/' (?)
    response.sendFile(path.join(__dirname, '/static/index.html'));
});

// Start the server
server.listen(5000, function() {
    // prints on new line
    console.log('Starting server on port 5000');
});

// SENDING A MESSAGE FROM SERVER
/* For testing
// io.sockets.emit will send a message to ALL connected sockets with name 'message' and content 'hi!'
setInterval(function() {
    io.sockets.emit('message', "hi!");
}, 1000);
*/


// RECIEVING MESSAGE FROM GAME
// handle new player and keyboard input on server
// store all new players as Javascript dictionaries
var players = {};
io.on('connection', function(socket) {
    socket.on('new player', function() {
        // key: socketID, value: x, y 
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.x -= 5;
        }
        if (data.up) {
            player.y -= 5;
        }
        if (data.right) {
            player.x += 5;
        }
        if (data.down) {
            player.y += 5;
        }
    });
});


// SENDING MESSAGE FROM SERVER TO GAME
// all connected sockets see this
setInterval(function() {
    io.sockets.emit('state', players);
}, 1000/60);
