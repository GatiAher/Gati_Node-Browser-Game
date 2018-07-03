// server.js for node-browser-game

// code from https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b

// Dependancies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

// create objects
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// setting up port and serving static files

// assign pair
app.set('port', 5000);

/* 
* express.static can load files from __dirname + '/static' directory
* middleware function (express.static) is mounted on the /static path. 
*/
app.use('/static', express.static(__dirname + '/static'));

// Routing
// Thus the anonymous function is executed for any type of HTTP request on the / path.
app.get('/', function(request, response) {
    // anonymous function
    // transfer the file at the given path
    // join - joins all arguments togther and normalizes resulting path, arguments must be strings
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(5000, function() {
    // prints on new line
    console.log('Starting server on port 5000');
});
