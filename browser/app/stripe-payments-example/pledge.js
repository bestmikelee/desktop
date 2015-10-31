app.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('pledge', {
            url: '/pledge',
            templateUrl: 'app/pledge/pledge.html',
            controller: PledgeCtrl
        });
}]);

function PledgeCtrl($scope) {
    $scope.pledge = {};
    $scope.invalidNumber = false;
    $scope.number = null;
}
