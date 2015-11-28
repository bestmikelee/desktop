var io = require('socket.io');

var sock;


function socketCreator(server){
	this.client;
	this.io = io(server)
	this.nsps = {};
}

socketCreator.prototype.getNamespace = function(userId,cb) {

	if (this.nsps[userId]) 
			return this.nsps[userId]
	this.nsps[userId] = this.io.of('/' + userId).on('connection',cb)
	return this.nsps[userId]
};	



module.exports = function(server){
	//var redisClient;
	if (sock) return sock
	//redisClient = redis.createClient(env.REDIS.url);

	sock = new socketCreator(server)
	//sock.client = redisClient
	//sock.emitter = emitter(env.REDIS.url)
	//console.log(env.REDIS.url)

    return sock
    

}

