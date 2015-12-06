app.directive('navbar',['$rootScope', '$state', 'AuthService', 'AUTH_EVENTS', function($rootScope, $state, AuthService, AUTH_EVENTS) {

    var NavbarCtrl = ['$scope', function($scope) {

        // Search handling
        // $scope.search = "";
        // $scope.searchResults = "";
        // $scope.runSearch = function() {
        //     $scope.loading = true;
        //     $http({
        //         url: 'api/campaigns/search',
        //         method: "GET",
        //         params: {
        //             search: $scope.search
        //         }
        //     }).then(function(res) {
        //         if (!!$scope.search) {
        //             $scope.searchResults = res.data;
        //         } else {
        //             console.log("search results set to blank string");
        //             $scope.searchResults = "";
        //         }
        //         $timeout(function() {
        //             $scope.loading = false;
        //         }, 250);
        //     });
        // };
        //
        // $scope.collapseSearch = function() {
        //     $scope.searchResults = "";
        // };


        //// Auth info gettage
        $scope.user = null;

        $scope.isLoggedIn = function() {
            return AuthService.isAuthenticated();
        };

        $scope.logout = function() {
            AuthService.logout().then(function() {
                $state.go('home.landing');
            });
        };
    }];

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/navbar/navbar.html',
        link: function(scope) {

            var setUser = function() {
                // false says don't retrieve from server
                // $timeout(function(){
                AuthService.getLoggedInUser(false).then(function(user) {
                    scope.user = user;
                });
                // },0);
            };

            var removeUser = function() {
                console.log('happening');
                scope.user = null;
            };
            //user is getting set when root URL is hit in Home Controller, firing loginSuccess event

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            // make navbar collapse when menu item is selected
            var navBarCollapse = $('.navbar-collapse');
            scope.collapseNav = function() {
                navBarCollapse.collapse('hide');
            };
        },
        controller: NavbarCtrl
    };
}]);
