app.controller('requestCtrl', ['$scope', 'lockRequestHTTP', function($scope, lockRequestHTTP) {

    $scope.onAccept = function() {
        console.log('the accept button hit');
        lockRequestHTTP().getApproval().then(function(data) {
            console.log(data);
            //alert(data.data);
        });
    };

    $scope.onReject = function() {
        console.log('rejected ya bitch');
    };
    
}]);
