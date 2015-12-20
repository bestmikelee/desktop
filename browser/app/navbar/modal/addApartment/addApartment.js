app.directive('addApartment',function() {
    return {
        templateUrl:'app/navbar/modal/addApartment/addApartment.html',
        restrict: 'E',
        controller: ['$scope','$http','Session',($scope, $http, Session) => {
            var newLease = {};
            $scope.leaseName = '';

            var reader = new FileReader();

            reader.onloadend = function(e) {
                newLease.file = e.target.result.split(',').pop();
            };

            $scope.readFile = function(eventTarget) {
                if (eventTarget.files && eventTarget.files[0]) {
                    if (eventTarget.files[0].name.split('.').pop() === 'pdf') {

                        newLease.size = eventTarget.files[0].size;
                        newLease.type = eventTarget.files[0].type;
                        newLease.name = eventTarget.files[0].name;
                        newLease.ext= newLease.name.split('.').pop();

                        // Make name show up in form
                        $scope.$apply(function() {
                          $scope.leaseName = newLease.name;
                        });

                        reader.readAsDataURL(eventTarget.files[0]);

                    } else throw new Error("This ain't no PDF!");
                }
            };

            $scope.addApartment = function(apartment){

                // add building Id to submission
                apartment.building_id = $scope.addingType;
                apartment.newLease = newLease;
                apartment.newLease.rent = apartment.rent;
                apartment.newLease.start_date = apartment.start_date;
                apartment.newLease.start_date = apartment.end_date;
                apartment.newLease.building_id = apartment.building_id;
                apartment.newLease.landlord_id = Session.user.data._id;
                // post apartment object from form
              	$http.post('api/apartment/add', apartment).then(function(apt){

                    // check response status
                    if(apt.status === 200) {

                        // push apartment to front end model
                        Session.user.data.building_ids.filter(function(val){
                            return val._id === apt.data.building_id;
                        })[0]
                        .apartments.push(apt.data);

                        // clear form and fade out modal
                    		$scope.modalToggle(function(){
                            Object.keys(apartment).forEach(function(val){
                                apartment[val] = null;
                            });
                            $scope.addingType = null;
                            newLease = {};
                            $scope.leaseName = '';
                        });
                    }

              	});

            };
        }]
    };
});
