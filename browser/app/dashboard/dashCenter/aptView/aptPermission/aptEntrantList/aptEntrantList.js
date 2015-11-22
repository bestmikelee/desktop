app.directive('aptEntrantList', [function(){
	return {
		controller: 'aptEntrantListCtrl',
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/aptView/aptPermission/aptEntrantList/aptEntrantList.html'
	};
}]);

app.controller('aptEntrantListCtrl', ['$scope', 'llRestService', function ($scope, llRestService) {

    $scope.removeEntrant = function(entrant) {
        // remove key
        var entrantObj = _.merge({
            apartment_id: $scope.individuallySelectedApartment._id
        }, entrant);
        llRestService.removeKey(entrantObj).then(function(response) {
            // Add form contents to permitted_entrants array
            if (response) $scope.individuallySelectedApartment.permitted_entrants = $scope.individuallySelectedApartment.permitted_entrants.filter(function(val){
                return val.key_id !== entrantObj.key_id;
            });
        });
    };

}]);
