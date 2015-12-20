app.directive('modal',function() {
    return {
        scope: {
            loggedIn: '='
        },
        templateUrl:'app/navbar/modal/modal.html',
        restrict: 'E',
        controller: 'modalCtrl'
    };
});

app.controller('modalCtrl',['$scope','Session','$http','$timeout', function($scope, Session, $http, $timeout){

  $scope.showModal = false;

  // toggle showing modal + form (allow callback after fade)
  $scope.modalToggle = function(cb) {
      $scope.showModal = !$scope.showModal;
      if(cb) setTimeout(cb, 300); //transition animation takes 300ms at present
      if(!$scope.buildings) $scope.buildings = Session.user.data.building_ids;
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
