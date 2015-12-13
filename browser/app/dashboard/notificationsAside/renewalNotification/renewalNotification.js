app.directive('renewalNotification', function(){
	return {
		restrict: 'E',
    scope: {
      notification: '=',
      complete: '&'
    },
		templateUrl: 'app/dashboard/notificationsAside/renewalNotification/renewalNotification.html',
		controller: ['$scope','Session', function($scope, Session){

      $scope.apartment = {
        _id: $scope.notification.aptId,
        unit_number: "9R",
        end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
        address: "100 Grand Piano Ave.",  // need to get from building
        city: "New York",  // need to get from building
        state: "NY"  // need to get from building
      };
		}]
	};
});
