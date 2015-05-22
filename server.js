var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoUri = 'mongodb://admin:z21ETW-caXWD@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/hellonode' || 'mongodb://127.0.0.1:27017/hellonode';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Node\n\nServer Info:\nIP : ' + ipaddress + '\nPORT : ' + port);
    
    MongoClient.connect(mongoUri, function(err, db) {
        if (!err) {
            res.write('\nConnected to mongoDB database\n\nMongoDB Info:\nHOST : ' + process.env.OPENSHIFT_MONGODB_DB_HOST + '\nPORT : ' + process.env.OPENSHIFT_MONGODB_DB_PORT);
            var collection = db.collection('articles');
            collection.findOne(function(err, result) {
               if (!err) {
                   res.end('\nFound item in collection articles :\n' + JSON.stringify(result));
               } else {
                   res.end('\nCouldn\'t find items in collection.');
               }
            });
        } else {
            res.end('Couldn\'t connect to mongoDB.\nError Info :\n' + JSON.stringify(err));
        }
    });
}).listen(port, ipaddress);

console.log('Server started on ip ' + ipaddress + ' port ' + port);