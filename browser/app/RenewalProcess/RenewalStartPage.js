app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('RenewalStartPage',{
		url:'/RenewalStartPage',
		templateUrl:'app/RenewalProcess/RenewalStartPage.template.html',
		controller:'RenewalStartPageCtrl'
	})
}])


app.controller('RenewalStartPageCtrl', ['$scope','$http','Session','expiration','renewalStorage', function($scope,$http,Session,expiration,renewalStorage){
		$scope.renewalList = expiration.portAptFilter(function(apt){
			console.log(apt);
			return apt.daysToLxd < 100 && apt.lease_ids[0].status == "rented"})

		$scope.aptSelected = [];
		$scope.$on("renewalCommunication",function(event,apt){
			$scope.aptSelected.push(apt);
			console.log($scope.aptSelected)
			$scope.renewalList = $scope.renewalList.filter(function(obj){
				return !(obj._id === apt._id) 
			})
		})
		$scope.printScope = function(){
			console.log($scope)
		}

		$scope.removeApt = function(apt){
			$scope.aptSelected = $scope.aptSelected.filter(function(obj){
				return !(obj._id === apt._id) 
			})
			$scope.renewalList.unshift(apt);		
		}

		$scope.submit = function(){
			var r = confirm("Emails will be sent to every tenant listed for confirmation of the renewals.  Please Confirm the list and click ok")
			if(r === true) {
				$http.post('api/mandrill/renewalEmails', $scope.aptSelected).then(function(confirmed){
					console.log(confirmed)
				});
			}
		}
	}
])