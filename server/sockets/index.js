var socketio = require('socket.io');
// socket io singleton to be used in other routes

module.exports = function(server){
	var io;
	function createSocket(){
		return socketio(server);
	}

	return (function(){
		if (!io) {
			io = createSocket();
		}
		return io;
	})()
}