app.directive('lockRequest', function() {
    // Runs during compile
    return {
        // priority: 1,
        // terminal: true,
        scope: {
            job: '=',
            name: '=',
            where: '=',
            accept: '&',
            reject: '&',
            info: '&'
        },
        templateUrl:'app/dashboard/lockRequest/lockRequestSingle.html',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        // link: function($scope, iElm, iAttrs, controller) {
        //
        // }
    };
});
