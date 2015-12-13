app.directive('repairNotification', function(){
	return {
		restrict: 'E',
    scope: {
      notification: '=',
      completeFunc: '&'
    },
		templateUrl: 'app/dashboard/notificationsAside/repairNotification/repairNotification.html'
	};
});
