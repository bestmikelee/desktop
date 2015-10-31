app.service('findBrokerage', ['$http','Session', function($http,Session){
	console.log(Session);
	var params = {
		user_id:"56073b4cd8373df62f89ef6a"
	}

	console.log(params);

	this.get = $http.get('api/brokerage/56073b4cd8373df62f89ef6a').then(function(data){
		console.log(data);
	})	
}])