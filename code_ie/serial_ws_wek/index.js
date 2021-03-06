var app = require('express')();

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/cu.usbmodem143731", {
    baudRate: 9600
});

const parser = port.pipe(new Readline({
    delimiter: "\r\n"
}));


var OscEmitter = require('osc-emitter'),
    emitter = new OscEmitter();
emitter.add('localhost', 6448);

var server = app.listen(3000);
var io = require('socket.io')(server);

var serialPort = new com.SerialPort("/dev/cu.usbmodem1411", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

//Serve index.html when some make a request of the server
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

parser.on("data", function (data) {
    var res = data.split(",");
    emitter.emit('/wek/inputs', parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2]));
    io.sockets.emit('data', data);
    console.log(data);
});