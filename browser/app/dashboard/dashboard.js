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

    function getAddress(building) {
        return building.street_number + ' ' + building.street_name;
    }

    // select a specific building
    $scope.selectBuilding = function(building) {
        $scope.buildings.forEach((val)=> val.open = val._id === building._id && !building.open); // set all "open" on all buildings except selected building to false
        building = building.open ? building : undefined;
        $scope.currentAddress = building && getAddress(building) || 'Portfolio';
        $scope.updatePies(building && building._id);
        $scope.buildingSelected = building;
    };

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
