app.directive('aptInfo', [function(){
	return {
		controller: 'aptInfoCtrl',
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/aptView/aptInfo/aptInfo.html'
	};
}]);

app.controller('aptInfoCtrl', ['$scope', 'llRestService', function ($scope, llRestService) {

    $scope.lockAction = function(apartment) {
        apartment.spinner = true;
        llRestService.lockAction(apartment).then(function(response){
            $scope.individuallySelectedApartment.lockInfo.state = response.data.state;
            apartment.spinner = false;
        });
    };

		// @TODO create map of apt/lease properties to icons
		$scope.iconMap = {};

}]);
