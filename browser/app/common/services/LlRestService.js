app.service('llRestService', function($http, Session, $q) {
    this.shareKey = function(credentials) {
        credentials = _.merge({
            access_token : Session.user.access_token,
            lockId : '47c94e76-6292-45e9-9f7d-439824228407'
        },credentials);
        return $http.post('/lockitron/share', credentials)
            .then(function(response){
                if(response.data.statusCode>399) throw new Error('Broken Lockitron Stuffs');
                else return response;
            })
            .catch(function() {
                return $q.reject({
                    message: 'Things broke yo'
                });
            });
    };

    this.removeKey = function(credentials) {
        credentials = _.merge({
            access_token : Session.user.access_token,
            lockId : '47c94e76-6292-45e9-9f7d-439824228407'
        },credentials);
        return $http.post('/lockitron/revoke', credentials)
            .then(function(response){
                if(response.data.statusCode>399) throw new Error('Broken Lockitron Stuffs');
                else return response;
            })
            .catch(function() {
                return $q.reject({
                    message: 'Things broke yo'
                });
            });
    };

    this.getLockInfo = function(credentials) {
        credentials = _.merge({
            access_token : Session.user.access_token,
            lockId : '47c94e76-6292-45e9-9f7d-439824228407'
        },credentials);
        return $http.post('/lockitron/lockinfo', credentials)
            .then(function(response){
                response.data = JSON.parse(response.data);
                return response;
            })
            .catch(function() {
                return $q.reject({
                    message: 'Things broke yo'
                });
            });
    };

    this.lockAction = function(credentials) {
        credentials = {
            state : credentials.lockInfo.state === 'lock'? 'unlock' : 'lock',
            access_token : Session.user.access_token,
            lockId : '47c94e76-6292-45e9-9f7d-439824228407',
            noblock : 'false'
        };
        return $http.post('/lockitron/lockaction', credentials)
            .then(function(response){
                response.data = JSON.parse(response.data);
                return response;
            })
            .catch(function() {
                return $q.reject({
                    message: 'Things broke yo'
                });
            });
    };
});
