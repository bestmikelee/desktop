app.directive('aptPermissioning', [function(){
	return {
		controller: 'aptPermissioningCtrl',
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenterContent/aptPermissioning/aptPermissioning.html'
	};
}]);

app.controller('aptPermissioningCtrl', ['$scope', 'llRestService', function ($scope, llRestService) {

    $scope.lockAction = function(apartment) {
        apartment.spinner = true;
        llRestService.lockAction(apartment).then(function(response){
            $scope.apartmentSelected.lockInfo.state = response.data.state;
            apartment.spinner = false;
        });
    };

    $scope.addEntrant = function(entrant) {
        var entrantObj = _.merge({
            apartment_id: $scope.apartmentSelected._id
        }, entrant);
        entrantObj.start_date = new Date(entrantObj.start_date);
        entrantObj.expiration_date = new Date(entrantObj.expiration_date);

        // Clear form
        entrant.email = '';
        entrant.role = '';
        entrant.start_date = null;
        entrant.expiration_date = null;
        entrant.submitted = false;

        // entrantForm automatically defined by Angular
        entrantForm.checkEmail.value = '';

        // Add to back end
        llRestService.shareKey(entrantObj).then(function(response) {
            // Add form contents to permitted_entrants array
            entrantObj.key_id = response.data.id;
            if (response) $scope.apartmentSelected.permitted_entrants.push(entrantObj);
        });
    };

    $scope.removeEntrant = function(entrant) {
        // remove key
        var entrantObj = _.merge({
            apartment_id: $scope.apartmentSelected._id
        }, entrant);
        llRestService.removeKey(entrantObj).then(function(response) {
            // Add form contents to permitted_entrants array
            if (response) $scope.apartmentSelected.permitted_entrants = $scope.apartmentSelected.permitted_entrants.filter(function(val){
                return val.key_id !== entrantObj.key_id;
            });
        });
    };
}]);
