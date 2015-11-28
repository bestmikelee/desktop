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

    // set user's buildings
    $scope.buildings = Session.user.data.building_ids;
    $scope.buildingSelected = null;
    $scope.apartmentSelected = null;

    // get pie data from Session
    $scope.leaseStatusData = Session.getRenewalsData();

    // update pie data with building
    $scope.updatePies = function(buildingID) {
        $scope.leaseStatusData = Session.getRenewalsData(buildingID);
        $scope.apartmentSelected = null;
    };

    // set pie chart header value
    $scope.currentAddress = 'Portfolio';

    $scope.closeAll = function() {
        $scope.buildings.map(function(val) {
            val.open = false;
        });
        $scope.updatePies();
    };

    // watch each building for its accordion being open, if all building accordions are closed go to portfolio view
    $scope.buildings.forEach(function(building, index, buildingsArr) {
        $scope.$watch('buildings[' + index + '].open', function(isOpen) {
            // if a building is expanded, include it in graphic
            if (isOpen) {
                $scope.buildingSelected = building;
                $scope.currentAddress = building.street_number + ' ' + building.street_name;
                $scope.updatePies(building._id);
            } else {
                var total = 0;
                buildingsArr.forEach(function(val) {
                    if (val.open) total++;
                });
                if (!total) {
                    $scope.buildingSelected = null;
                    $scope.currentAddress = 'Portfolio';
                    $scope.updatePies();
                }
            }
        });
    });

    // select a specific apartment
    $scope.selectApartment = function(apartment) {
        apartment.spinner = true;
        $scope.apartmentSelected = apartment;
        llRestService.getLockInfo({}).then(function(response){
            apartment.lockInfo = response.data;
            apartment.spinner = false;
        });
    };

}]);
