app.directive('notificationsAside', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/notificationsAside/notificationsAside.html',
		controller: ['$scope', function($scope){
			$scope.requests = [{
					name: "Alex Holman",
					job: "Broker",
					where: "119 Wykoff St",
					time: "sample time needed",
					email: "mike.sj.lee@gmail.com"
			}, {
					name: "Rodger Beaman",
					job: "Broker",
					where: "182 N 10th St",
					time: "sample time needed",
					email: "mike.sj.lee@gmail.com"
			}, {
					name: "Mike Lee",
					job: "Tenant",
					where: "581 Warren St",
					time: "sample time needed",
					email: "mike.sj.lee@gmail.com"
			}, {
					name: "Max Baldwin",
					job: "Broker",
					where: "324 Bergen St",
					time: "sample time needed",
					email: "mike.sj.lee@gmail.com"
			}];
		}]
	};
});
