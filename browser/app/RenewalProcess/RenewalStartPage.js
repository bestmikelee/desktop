app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('RenewalStartPage',{
		url:'/RenewalStartPage',
		templateUrl:'app/RenewalProcess/RenewalStartPage.template.html',
		controller:'RenewalStartPageCtrl'
	})
}])

app.controller('RenewalStartPageCtrl', ['$scope','$http','Session','expiration', function($scope,$http,Session,expiration){
		$scope.renewalList = expiration.expiration().hundred
	}
])