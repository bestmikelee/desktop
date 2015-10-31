app.controller('modalController',['$scope','Session','$http','$timeout', function($scope, Session, $http, $timeout){
  var modal = $('.modal-fade');

  $scope.buildings = Session.user.data.building_ids;

  // toggle showing modal + form (allow callback after fade)
  $scope.modalToggle = function(cb) {
    var fadeTime = 400;
    if(modal.hasClass('visible')) {
      modal.removeClass('visible').fadeOut(fadeTime, cb);
    } else {
      modal.addClass('visible').fadeIn(fadeTime, cb);
    }
  };


  $scope.addApartment = function(apartment){
    // add building Id to submission
    apartment.building_id = $scope.addingType;
    // post apartment object from form
  	$http.post('api/apartment/add', apartment).then(function(apt){
      // push apartment to front end model
      Session.user.data.building_ids.filter(function(val){
        return val._id === apt.data.building_id;
      })[0]
      .apartments.push(apt.data);

      // clear form and fade out modal
  		if(apt.status === 200) $scope.modalToggle(function(){
        Object.keys(apartment).forEach(function(val){
          apartment[val] = null;
        });
        $scope.addingType = null;
      });

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
