var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoUri = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' || 'mongodb://127.0.0.1:27017/hellonode';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Node\n\nServer Info:\nIP : ' + ipaddress + '\nPORT : ' + port);
    
    MongoClient.connect(mongoUri, function(err, db) {
        if (!err) {
            res.end('\nConnected to mongoDB database\n\nMongoDB Info:\nHOST : ' + process.env.OPENSHIFT_MONGODB_DB_HOST + '\nPORT : ' + process.env.OPENSHIFT_MONGODB_DB_PORT);
        } else {
            res.end('Couldn\'t connect to mongoDB.\nError Info :\n' + JSON.stringify(err));
        }
    });
}).listen(port, ipaddress);

console.log('Server started on ip ' + ipaddress + ' port ' + port);