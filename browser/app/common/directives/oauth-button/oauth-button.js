app.config(function($urlRouterProvider, $locationProvider) {
    // route to handle Oauth
    $urlRouterProvider.when('/auth/:provider', function () {
       window.location.reload();
    });
});


app.directive('oauthButton', function () {
	return {
		scope: {
			providerName: '@',
            buttonText: '@'
		},
		restrict: 'E',
		templateUrl: 'app/common/directives/oauth-button/oauth-button.html'
	}
});
