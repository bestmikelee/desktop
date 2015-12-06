app.factory('lockRequestHTTP', ['$http', 'Session', function($http, Session) {
    return function name() {
        var obj = {};
        obj.getApproval = function(userRequest) {
            //console.log(Session.access_token)
            //params object schema:
            //params = {
                // access_token: Session.user.access_token,
                // lock_id: "dfa8e474-0fda-4916-861b-7fe09375731a",
                // email: "rwcbeaman@gmail.com",
                // phone: "5552223333",
                // name: "roger"
                // start_date: userRequest.start_date,
                // end_date: userRequest.end_date,
                // role: "guest" (default) or "admin"
            //}
        	var params = {
                access_token: Session.user.access_token,
                lock_id: "dfa8e474-0fda-4916-861b-7fe09375731a",
                email: "rwcbeaman@gmail.com",
                name: "roger"
                // start_date: userRequest.start_date,
                // end_date: userRequest.end_date
            };
            return $http.post('api/lockitron/share',params)
                .then(function(data) {
                    return data;
                })
                .catch(function(err) {
                    if (err) {
                        console.err(err);
                    }
                });
        };
        return obj;
    };
}]);
