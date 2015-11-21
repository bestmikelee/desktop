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
			$scope.renewed = false;
			$scope.initiateRenewal = function(apt){
				apt['newRent'] = $scope.newRent
				$scope.renewed = true;
				renewalStorage.initiateRenewalArr.push(apt);
				console.log(renewalStorage.initiateRenewalArr)
			}
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'app/RenewalProcess/renewalApartmentDirective/renewalApartment.directive.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);