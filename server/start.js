'use strict';

//enables es6 in all files except this one
require('babel-core/register');

var chalk = require('chalk');

var startDb = require('./db');
var app = require('./app');

var server = require('http').createServer();
//var socket = require('./sockets');

var createApplication = function() {
  server.on('request', app);
  
};

var startServer = function () {
    // Allow user to specify port number from console
    var PORT = process.argv[2] && !isNaN(Number(process.argv[2]))? Number(process.argv[2]) : process.env.PORT || 5000;
    server.listen(PORT, function () {
        console.log(chalk.green('Server started on port', chalk.blue(PORT)));
    });
<<<<<<< HEAD
    require('./sockets')(server)
};	
=======
};
>>>>>>> f39ee0e34bc3c1651c2d42a7b43a2138c31b21d9

// var connectSocket = function(){
// 	io = socket(server);
// 	// io.on('connection', function(sock){
// 	// 	console.dir('sockets!!',);
// 	// 	sock.emit('hi',{yo:'yo'})
// 	// });
// }



startDb
	.then(createApplication)
	.then(startServer)
	//.then(connectSocket)
	.catch(function(err){
	  console.error(chalk.red(err.stack));
	  process.kill(1);
	});
