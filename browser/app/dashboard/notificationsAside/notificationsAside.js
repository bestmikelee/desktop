app.directive('notificationsAside', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/notificationsAside/notificationsAside.html',
		controller: ['$scope', function($scope){

			$scope.completeFunc = function(type, notification) {
				notification.complete = !notification.complete;
			};

			$scope.renewalNotifications = [{
					aptId: "5647f77e9d7b02b459efd49b",
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					complete: false
			}];

			$scope.repairNotifications = [{
					aptId: "5647f77e9d7b02b459efd4a0",
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}];


		}]
	};
});
