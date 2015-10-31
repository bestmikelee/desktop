app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('fntStartPage', {
        url: '/fntStartPage',
        templateUrl: 'app/fntProcess/fntStartPage/FNTstartPage.html',
        controller: 'fntFirstPageCtrl'
    });
}]);

app.controller('fntFirstPageCtrl', ['$scope', '$state', 'fntStorage', function($scope, $state, fntStorage) {
    var counter = 0;

	fntStorage.apartments75out()



	$scope.fntStart = [
		{
			building:"581 Warren",
			apartment:"4R"
		},
		{
			building:"324 Bergen",
			apartment:"3L"
		},
		{
			building:"68 Middaugh",
			apartment:"8"
		},
		{
			building:"53 Fourth Avenue",
			apartment:"4"
		}
	]

    $scope.counter = function() {
        counter += 1;
        console.log(counter);
    };


    $scope.submit = function() {
        if (fntStorage.totalList() !== 4) {
            console.log('TEST', fntStorage.totalList() === 4);
            alert('You need to select start or postpone for every apartment in the renewal process');
            return;
        }
        $state.go('fntBrokerSelection');
    };

}]);
