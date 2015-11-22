app.directive('aptPermissionForm', [function(){
	return {
		controller: 'aptPermissionFormCtrl',
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/aptView/aptPermission/aptPermissionForm/aptPermissionForm.html'
	};
}]);

app.controller('aptPermissionFormCtrl', ['$scope', 'llRestService', function ($scope, llRestService) {

    $scope.addEntrant = function(entrant) {
        var entrantObj = _.merge({
            apartment_id: $scope.individuallySelectedApartment._id
        }, entrant);
        entrantObj.start_date = new Date(entrantObj.start_date);
        entrantObj.expiration_date = new Date(entrantObj.expiration_date);

        // Clear form
        entrant.email = '';
        entrant.role = '';
        entrant.start_date = null;
        entrant.expiration_date = null;
        entrant.submitted = false;
				entrantForm.checkEmail.value = ''; // entrantForm object is Angular auto-defined form object

        // Add to back end
        llRestService.shareKey(entrantObj).then(function(response) {
            // Add form contents to permitted_entrants array
            entrantObj.key_id = response.data.id;
            if (response) $scope.individuallySelectedApartment.permitted_entrants.push(entrantObj);
        });
    };

}]);
