app.controller('dashboardCtrl', ['$scope','$timeout', 'Session', 'llRestService', function ($scope, $timeout, Session, llRestService) {

    // set user's buildings
    $scope.buildings = Session.user.data.building_ids;
    $scope.buildingSelected = null;
    $scope.apartmentSelected = null;

    // $scope.buildings.forEach(function(building){
    //     building.apartments.forEach(function(apartment){
    //
    //     });
    // });

    // show one building at a time
    $scope.oneAtATime = true;

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

    // apartment-specific stuff
    $scope.selectApartment = function(apartment) {
        apartment.spinner = true;
        $scope.apartmentSelected = apartment;
        llRestService.getLockInfo({}).then(function(response){
            apartment.lockInfo = response.data;
            apartment.spinner = false;
        });
    };

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
