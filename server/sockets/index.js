'use strict';
var socketio = require('socket.io');

var sockets = {
	io: null,
	nsps: {},
	useNamespace: function(path, cb){
		if (this.nsps[path]) {
			return this.nsps[path];
		}
		this.nsps[path] = this.io.of(path)
		this.nsps[path].on('connection', cb)
		return this.nsps[path];
	}
}

module.exports = function (server) {

    if (sockets.io) return sockets;

    sockets.io = socketio(server);

    sockets.io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
        socket.emit('hi',{yo:'yo'})
    });
    
    
    return sockets;

};



