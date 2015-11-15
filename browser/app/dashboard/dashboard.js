app.config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('home.dashboard', {
            url: '',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
}]);


app.controller('dashboardCtrl', ['$scope','$timeout', 'Session', 'llRestService', function ($scope, $timeout, Session, llRestService) {

    // show one building at a time
    $scope.oneAtATime = true;
    
}]);


app.filter('presentableVals', function() {
    return function(obj) {
        var result = {};
        var replaceUnderscoreRegex = /_/g;
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] !== 'object' && key.indexOf('$') === -1 && key.indexOf('_id') === -1 && key.indexOf('__v') === -1 && key !=='spinner') {
                // handle converting dates to slashes
                var tempDate = key.indexOf('date') !== -1 ? new Date(obj[key]) : '';
                var dateConv = tempDate ? '' + tempDate.getMonth() + '/' + tempDate.getDate() + '/' + tempDate.getFullYear().toString().slice(2) : '';

                //handle converting booleans to 'Yes' and 'No' and store value on returned object
                result[key.replace(replaceUnderscoreRegex, ' ')] = tempDate ? dateConv : typeof obj[key] !== 'boolean' ? obj[key] : obj[key] ? 'yes' : 'no';
            }
        }
        return result;
    };
});
