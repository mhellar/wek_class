var osc = require('node-osc');

var incoming;

var oscServer = new osc.Server(6448, '0.0.0.0');


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var servo = new five.Servo(9);
    oscServer.on("message", function(msg, rinfo) {
        console.log(msg);
        incoming = msg[1];
        var move = map_range(incoming, -10, 10, 0, 180);
        servo.to(move);
    });
});