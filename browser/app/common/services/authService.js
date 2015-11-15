app.service('AuthService', function($http, Session, $rootScope, AUTH_EVENTS, $q, $location) {

    function onSuccessfulAuth(response) {
        var user = response.data.user;
        console.log('user',user)
        user.admin = response.data.admin;
        user.isLandlord = user.userType.indexOf('landlord') > -1;
        user.isBroker = user.userType.indexOf('broker') > -1;
        user.isTenant = user.userType.indexOf('tenant') > -1;
        user.isContractor = user.userType.indexOf('contractor') > -1;
        return $http.get('api/landlord/' + user._id)
		.then(function(buildingResponse){
            var lordSocket = io.connect(location.host + '/lordSocket/' + user._id)
            console.log(location.host)
            console.log(lordSocket)
            lordSocket.on('auth', function(data){
                console.log(data);
            })
             Session.create(response.data.id, user, buildingResponse.data, response.data.access_token);
             $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			 return user;
		});
    }


    // Uses the session factory to see if an
    // authenticated user is currently registered.
    this.isAuthenticated = function() {
        return !!Session.user;
    };

    this.getLoggedInUser = function(fromServer) {

        // If an authenticated session exists, we
        // return the user attached to that session
        // with a promise. This ensures that we can
        // always interface with this method asynchronously.

        // Optionally, if true is given as the fromServer parameter,
        // then this cached value will not be used.
        if (this.isAuthenticated() && fromServer !== true) {
            return $q.when(Session.user);
        }

        // Make request GET /session.
        // If it returns a user, call onSuccessfulAuth with the response.
        // If it returns a 401 response, we catch it and instead resolve to null.
        return $http.get('/session').then(onSuccessfulAuth).catch(function() {
            return null;
        });
    };

    this.logout = function() {
        return $http.get('/logout').then(function() {
            Session.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
    };

    // adds or removes admin privileges from another user
    this.adminPriv = function(user, newAdminEmail, addOrDelete) {
        return $http.post('/api/admins/' + user._id, {email: newAdminEmail, addOrDelete: addOrDelete});
    };

    // deletes another user, requires admin privileges
    this.deleteUser = function(deleteUserEmail) {
        return $http.post('/api/admins/deleteuser', {email: deleteUserEmail});
    };

});
