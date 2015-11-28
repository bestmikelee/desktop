app.directive('aptView', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/aptView/aptView.html',
		scope: {
			individuallySelectedApartment: '='
		}
	};
});
