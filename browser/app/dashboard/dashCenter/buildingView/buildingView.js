app.directive('buildingView', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/buildingView/buildingView.html',
		scope: {
			individuallySelectedBuilding: '='
		},
		controller: ['$scope',function($scope){

			// @TODO create map of apt/lease properties to icons
			$scope.iconMap = {};
			
		}]
	};
});
