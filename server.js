var http = require('http');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node\n\nServer Info:\nIP : ' + ipaddress + '\nPORT : ' + port);
}).listen(port, ipaddress);

console.log('Server started on ip ' + ipaddress + ' port ' + port);