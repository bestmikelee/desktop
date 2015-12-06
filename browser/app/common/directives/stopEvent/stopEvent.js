app.directive('stopEvent', () => ({
    restrict: 'A',
    link: function (scope, element, attr) {
        if(attr && attr.stopEvent)
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
    }
}));
