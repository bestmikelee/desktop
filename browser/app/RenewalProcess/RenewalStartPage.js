app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('RenewalStartPage',{
		url:'/RenewalStartPage',
		templateUrl:'app/RenewalProcess/RenewalStartPage.template.html',
		controller:'RenewalStartPageCtrl'
	})
}])

app.controller('RenewalStartPageCtrl', ['$scope','$http','Session','RenewalStartPageService', function($scope,$http,Session,RenewalStartPageService){
	var RSPService = RenewalStartPageService
	console.log(RSPService.organizedLXD, RSPService.lxdCalendar)

}])