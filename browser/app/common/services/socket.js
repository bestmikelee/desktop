app.service('Socket', function(socketFactory) {
	this.socket = null;

	this.init = function(userId){
		if (this.socket) return this.socket;
		this.socket = socketFactory({
            ioSocket: io.connect(location.host + '/' + userId)
        })
        
        return this.socket;
	}
});
