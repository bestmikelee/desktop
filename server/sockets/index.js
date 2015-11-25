var io = require('socket.io');
var emitter = require('socket.io-emitter');
// var socketio = require("socket.io")
var redis = require('redis');
var path = require('path');

var env = require(path.join(__dirname,
	'../env/' + (process.env.NODE_ENV === 'production'? 'production.js' : 'development.js')));
var sock;


function socketCreator(server, redisCli){
	this.client;
	this.io = io(server)//.adapter(redisCli);
	this.emitter;
	this.nsps = {};
}

// socketCreator.prototype.nsps = {};

socketCreator.prototype.getNamespace = function(userId,cb) {
	var that = this;
	if (this.nsps[userId]) 
			return this.nsps[userId]
	this.nsps[userId] = this.io.of('/' + userId).on('connection',cb)
	return this.nsps[userId]
};	



module.exports = function(server){
	var redisClient;
	if (sock) return sock
	redisClient = redis.createClient(env.REDIS.url);

	sock = new socketCreator(server,redisClient)
	sock.client = redisClient
	sock.emitter = emitter(env.REDIS.url)
	console.log(env.REDIS.url)

    return sock
    

}

