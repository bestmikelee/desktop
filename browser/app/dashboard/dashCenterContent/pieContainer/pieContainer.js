app.directive('pieContainer', [function(){
	return {
		controller: 'pieContainerCtrl',
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenterContent/pieContainer/pieContainer.html',
		scope: {
			showElem: '=',
			pieData: '=',
			address: '='
		}
	};
}]);

app.controller('pieContainerCtrl', ['$scope', function ($scope) {
	console.log($scope);
}]);
