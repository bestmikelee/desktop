app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('fntBrokerSelection',{
		url:'/fntBrokerSelection',
		templateUrl:'app/fntProcess/brokerSelection/fnt.brokerSelection.html',
		controller:'fntBrokerSelectionCtrl'
	});
}]);

app.controller('fntBrokerSelectionCtrl', ['$scope','fntStorage','$cacheFactory','findBrokerage', 'RenewalStartPageService',function($scope,fntStorage,$cacheFactory,findBrokerage,RenewalStartPageService){
	var cache = $cacheFactory.get('fntStart')
	$scope.startList = cache.get('startList')
}])
