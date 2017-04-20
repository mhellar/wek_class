//Install Modules
var express = require('express');
var osc = require('node-osc');

var app = express();
var server = app.listen(3001);
app.use(express.static('public'));

var io = require('socket.io')(server);


//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Connect to server, Our device
var oscServer = new osc.Server(12000, '127.0.0.1');

//When we recieve a message send it as a web socket
oscServer.on("message", function(msg, rinfo) {
    console.log("TUIO message:");
    console.log(msg);
    var ctrl = msg[0];

    var data = msg[1];
    io.sockets.emit('data', msg[1]);

});