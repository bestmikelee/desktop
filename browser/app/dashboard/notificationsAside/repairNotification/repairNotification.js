app.directive('repairNotification', function(){
	return {
		restrict: 'E',
    scope: {
      notification: '=',
      completeFunc: '&'
    },
		templateUrl: 'app/dashboard/notificationsAside/repairNotification/repairNotification.html'
	};
});

var app = angular.module('app', []);

app.value('config', {
	'OFFSET_Y': 50
});

app.controller('MainController', [
	'$scope',
	'$rootScope',
	'config',
	'$window',

	function ($scope, $root, $config, $window) {
		$scope.sorter = 'id';

		$scope.items = [
			{
				"id": 1,
				"first_name": "John",
				"last_name": "Doe"
			},
			{
				"id": 2,
				"first_name": "Jane",
				"last_name": "Doe"
			},
			{
				"id": 3,
				"first_name": "Jon",
				"last_name": "Dobbs"
			},
			{
				"id": 4,
				"first_name": "Alice",
				"last_name": "Birdman"
			},
			{
				"id": 5,
				"first_name": "Sally",
				"last_name": "Xylophony"
			},
			{
				"id": 6,
				"first_name": "Ray",
				"last_name": "Bradbury"
			},
			{
				"id": 7,
				"first_name": "Arthur C.",
				"last_name": "Clark"
			},
			{
				"id": 8,
				"first_name": "Good King",
				"last_name": "Wensuslausage"
			},
			{
				"id": 9,
				"first_name": "Booker T.",
				"last_name": "Washington"
			},
			{
				"id": 10,
				"first_name": "Miles",
				"last_name": "Davis"
			},
			{
				"id": 11,
				"first_name": "Daniel",
				"last_name": "McDaniels"
			}
		];

		$scope.timer = 0;

		$root.currItemIndex = 0;

		$scope.$watch('sorter', function(){
			$window.clearTimeout($scope.timer);
			$scope.timer = $window.setTimeout(rearrange, 100);
		});

		function rearrange(){
			$('.item').each(function(idx, el){
				var $el = $(el);
				var newTop = idx * $config.OFFSET_Y;

				if (newTop != parseInt($el.css('top'))) {
					$el.css({
						'top': newTop
					})
					.one('webkitTransitionEnd', function (evt){
						$(evt.target).removeClass('moving');
					})
					.addClass('moving');
				}

			});
		}

	}
]);

app.controller('jdController', ['$element','$rootScope','config', function($element, $rootScope, $config){
		$element.css({
			'top': $rootScope.currItemIndex * $config.OFFSET_Y
		});
		$rootScope.currItemIndex++;
	}
]);

app.directive('jdScript', [
	function(){
		return {
			restrict: 'EA',
			controller: 'jdController'
		};
	}
]);
