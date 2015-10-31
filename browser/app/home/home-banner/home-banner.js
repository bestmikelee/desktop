app.directive('homeBanner', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/home/home-banner/home-banner.html',
        controller: HomeCtrl
    };
});

function HomeCtrl($scope) {
    $scope.goToHowWorks = function(){
        var aboutTop = Math.ceil($('#about').offset().top);
        $('html, body').animate({
            scrollTop: aboutTop
        }, aboutTop - $(window).scrollTop() * 0.8);
    };
}
