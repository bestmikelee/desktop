app.directive('d3VisualsContainer', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/d3VisualsContainer/d3VisualsContainer.html',
		scope: {
			pieData: '=',
			address: '=',
			showElem: '='
		},
		controller: function($scope){
			console.log('d3VisualsContainer pieData data show: ', JSON.stringify(!!$scope.pieData.pieChart.length));
			console.log('d3VisualsContainer pieData data: ', JSON.stringify($scope.pieData.pieChart));
			console.log('d3VisualsContainer renewal data show: ', JSON.stringify(!!$scope.pieData.renewalStatuses.length));
			console.log('d3VisualsContainer renewal data: ', JSON.stringify($scope.pieData.renewalStatuses));
		}
	};
});
