app.directive('modal', function() {
    // Runs during compile
    return {
        scope: {},
        templateUrl:'app/navbar/modal/modal.html',
        restrict: 'E',
        controller: 'modalController'
    };
});

app.controller('modalController',['$scope','Session','$http','$timeout', function($scope, Session, $http, $timeout){

  $scope.showModal = false;

  // toggle showing modal + form (allow callback after fade)
  $scope.modalToggle = function(cb) {
      $scope.showModal = !$scope.showModal;
      if(cb) setTimeout(cb, 300); //transition animation takes 300ms at present
  };

  $scope.buildings = Session.user.data.building_ids;

  var newLease = {};
  $scope.leaseName = '';

  var reader = new FileReader();

  reader.onloadend = function(e) {
      newLease.file = e.target.result.split(',').pop();
  };

  $scope.readFile = function(eventTarget) {
      console.log(eventTarget.files[0]);
      console.log("in show pdf");

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

          } else {
              console.log("This ain't no PDF!");
              throw new Error("This ain't no PDF!");
          }
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
  $scope.addBuilding = function(building){
    // add landlord Id to submission
  	building.landlord_id = Session.user.data._id;
    // post building object from form
  	$http.post('api/building/add', building).then(function(bld){
      // push building to front end model
      Session.user.data.building_ids.push(bld.data);

      // clear form and fade out modal
      if(bld.status === 200) $scope.modalToggle(function(){
        Object.keys(building).forEach(function(val){
          building[val] = null;
        });
        $scope.addingType = null;
      });

  	});
};
}]);
