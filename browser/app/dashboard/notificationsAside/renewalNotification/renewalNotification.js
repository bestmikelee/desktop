app.directive('renewalNotification', function(){
	return {
		restrict: 'E',
    scope: {
      notification: '=',
      completeFunc: '&'
    },
		templateUrl: 'app/dashboard/notificationsAside/renewalNotification/renewalNotification.html'
	};
});
