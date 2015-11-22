app.directive('buildingView', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/buildingView/buildingView.html',
		scope: {
			individuallySelectedBuilding: '='
		}
	};
});
