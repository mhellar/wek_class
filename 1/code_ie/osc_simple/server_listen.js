var osc = require('node-osc');

var oscServer = new osc.Server(12000, '0.0.0.0');
oscServer.on("message", function(msg, rinfo) {
    console.log("TUIO message:");
    console.log(msg);
});