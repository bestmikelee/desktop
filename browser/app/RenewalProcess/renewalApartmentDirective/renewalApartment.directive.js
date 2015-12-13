app.directive('renewalapartment', ['renewalStorage',function(renewalStorage){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			apartment:"=",
			building:"=",
			initiateRenewal:"&"
		}, // {} = isolate, true = child, false undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.showNewRent = false;
			$scope.renewed = false;
			$scope.initiateRenewal = function(apt){
				// console.log(apt);
				if($scope.newRent < 0 || $scope.newRent > 9999 || $scope.newRent === undefined) 
					{$scope.wrongRent = true}
				else {
					apt['newRent'] = $scope.newRent
					$scope.showNewRent = true;
					$scope.wrongRent = false;
					$scope.renewed = true;
					$scope.$emit("renewalCommunication",apt)
				}
			}
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'app/RenewalProcess/renewalApartmentDirective/renewalApartment.directive.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);