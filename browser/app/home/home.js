app.config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('home', {
            url: '/',
            template: '<ui-view></ui-view>',
            onEnter: ['$state','$timeout','AuthService', function($state, $timeout, AuthService) {
                console.log('is this hitting')
                AuthService.getLoggedInUser().then(function(user) {
                    if (user) {
                        console.log('going dash');
                        $timeout(function() {
                            $state.go('home.dashboard');
                        });
                    } else {
                        $timeout(function() {
                            $state.go('home.landing');
                        });
                    }
                });
            }]
        }).state('home.landing', {
            url: '',
            templateUrl: 'app/home/home.html',
            controller: function HomeCtrl($scope) {
                $scope.goToWhatWeDo = function(){
                    var aboutTop = Math.ceil($('#about').offset().top);
                    $('html, body').animate({
                        scrollTop: aboutTop
                    }, aboutTop - $(window).scrollTop() * 0.8);
                };
            }
        });
}]);
