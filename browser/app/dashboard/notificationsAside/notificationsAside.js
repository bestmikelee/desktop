app.directive('notificationsAside', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/notificationsAside/notificationsAside.html',
		controller: ['$scope','Session', function($scope, Session){

			$scope.completeFunc = function(type, notification) {
				notification.complete = !notification.complete;
			};

			$scope.renewalNotifications = [{
					aptId: "5647f77e9d7b02b459efd49b",
					unit_number: "9R",
	        end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
	        address: "100 Grand Piano Ave.",  // need to get from building
	        city: "New York",  // need to get from building
	        state: "NY",  // need to get from building
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					unit_number: "9R",
					end_date: "2014-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					unit_number: "9R",
					end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					unit_number: "9R",
					end_date: "2014-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false
			}];

			$scope.repairNotifications = [{
					aptId: "5647f77e9d7b02b459efd4a0",
					unit_number: "9R",
	        end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
	        address: "100 Grand Piano Ave.",  // need to get from building
	        city: "New York",  // need to get from building
	        state: "NY",  // need to get from building
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					unit_number: "9R",
					end_date: "2014-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					unit_number: "9R",
					end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd49b",
					unit_number: "9R",
					end_date: "2015-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
					complete: false,
					contractor: {
						name: "Example LLC",
						phone: "(212)555-555",
						email: "example@example.com"
					}
			}, {
					aptId: "5647f77e9d7b02b459efd4a0",
					unit_number: "9R",
					end_date: "2014-04-21T16:23:09.000Z",  // need to get from lease[0]
					address: "100 Grand Piano Ave.",  // need to get from building
					city: "New York",  // need to get from building
					state: "NY",  // need to get from building
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
