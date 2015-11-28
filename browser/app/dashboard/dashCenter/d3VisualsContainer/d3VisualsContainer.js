app.directive('d3VisualsContainer', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/d3VisualsContainer/d3VisualsContainer.html',
		scope: {
			pieData: '=',
			address: '='
		}
	};
});
