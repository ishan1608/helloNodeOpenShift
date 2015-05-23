var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var obfus = require('./obfuscate.js');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoUri = 'mongodb://admin:z21ETW-caXWD@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/hellonode';
//var mongoUri = 'mongodb://127.0.0.1:27017/hellonode';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Node\n\nServer Info:\nIP : ' + ipaddress + '\nPORT : ' + port);
    
    MongoClient.connect(mongoUri, function(err, db) {
        if (!err) {
            res.write('\nConnected to mongoDB database\n\nMongoDB Info:\nHOST : ' + process.env.OPENSHIFT_MONGODB_DB_HOST + '\nPORT : ' + process.env.OPENSHIFT_MONGODB_DB_PORT);
            // CP's section
            user = new Object();
            user.name = 'Ishan';
            user.email = 'ishanatmuzaffarpur@gmail.com';
            user.phonenumber = '+91-7696490368';
            user.password = 'm7382in';
            
            var users = db.collection('users');
            users.insert(user,{safe:true},function(err,result){
                console.log('Result:');
                console.dir(result);	// Works
                console.log('Error::');
                console.dir(err);
                //JSON reply back!!
                if(err){
                    console.log('Something wrong happended: '+err);
                    ob = new Object();
                    ob.status = "1002";
                    if(err.message.indexOf('E11000')!=-1)
                        ob.message = '\nProblem - user already exists with this number';
                    else
                        ob.message = '\nsProblem - unknown error';
                    res.end(JSON.stringify(ob));
                }else{
                    //Insert successful. return json object with data about user
                    ob = new Object();
                    ob.key = obfus.obfuscate(result[0]._id);	//  Not even result[0]._id.toString() or .toString
                    ob.status = "1000";
                    ob.message = '\nUser added to database successfully';
                    res.end(JSON.stringify(ob));
                }
                db.close();
            });
            var users = db.collection('users');
        } else {
            res.end('\nCouldn\'t connect to mongoDB.\nError Info :\n' + JSON.stringify(err));
        }
    });
}).listen(port, ipaddress);

console.log('Server started on ip ' + ipaddress + ' port ' + port);