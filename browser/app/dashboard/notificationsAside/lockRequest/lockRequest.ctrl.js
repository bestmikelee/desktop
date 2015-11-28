app.controller('requestCtrl', ['$scope', 'lockRequestHTTP', function($scope, lockRequestHTTP) {
    $scope.requests = [{
        name: "Alex Holman",
        job: "Broker",
        where: "119 Wykoff St",
        time: "sample time needed",
        email: "mike.sj.lee@gmail.com"
    }, {
        name: "Rodger Beaman",
        job: "Broker",
        where: "182 N 10th St",
        time: "sample time needed",
        email: "mike.sj.lee@gmail.com"
    }, {
        name: "Mike Lee",
        job: "Tenant",
        where: "581 Warren St",
        time: "sample time needed",
        email: "mike.sj.lee@gmail.com"
    }, {
        name: "Max Baldwin",
        job: "Broker",
        where: "324 Bergen St",
        time: "sample time needed",
        email: "mike.sj.lee@gmail.com"
    }];

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
