app.directive('fntapartment', ['fntStorage',function(fntStorage){
	// Runs during compile
	return {
		scope: {
			building:'=',
			apartment:'=',
			oldrent:'=',
			newrent:'='
		},
		controller: function($scope, $element, $attrs, $transclude) {
		},
		restrict: 'E',
		templateUrl: 'app/fntProcess/FNTstartPage/fntApartmentDirective/fntApartment.directive.html',
		link: function($scope, iElm, iAttrs, controller) {
			$scope.initiateClicked = false;
			$scope.postponeClicked = false;

			var currentBuilding = {
					building:$scope.building,
					apartment:$scope.apartment
			}

			$scope.initiate = function(apartment){
				$scope.initiateClicked = true
				$scope.postponeClicked = false
				fntStorage.addStartList(currentBuilding);
			}

			$scope.postpone = function(){
				$scope.initiateClicked = false
				$scope.postponeClicked = true
				$scope.postponeClicked = !$scope.initiateClicked;
				fntStorage.addPostponeList(currentBuilding)
			}
		}
	}
}]);
