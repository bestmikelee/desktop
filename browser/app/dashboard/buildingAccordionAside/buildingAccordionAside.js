app.directive('buildingAccordionAside', () => ({
	restrict: 'E',
	templateUrl: 'app/dashboard/buildingAccordionAside/buildingAccordionAside.html',
	controller: ['$scope', ($scope) => {
		$scope.accordionAdjust = 0;
	}],
	link: (scope) => {
		var accordion = angular.element(document.querySelector('.accordion-list'))[0].children;
		setTimeout(() => {
			var accordionCollapse = angular.element(document.querySelectorAll('.accordion-collapse'));
			scope.animateAccordion = (index) => {
				scope.accordionAdjust = accordionCollapse[index].scrollHeight;
				setTimeout(() => {
					angular.element(accordion[index]).addClass('animate');
				});
				setTimeout(() => {
					scope.$apply(scope.accordionAdjust = 0);
					angular.element(accordion[index]).removeClass('animate');
				}, 300);
			};
		});
	}
}));

// +export default function removeElementsByClass(obj, classNames) {
//  +    if(obj && obj.children) {
//  +        Object.keys(obj.children).forEach((val) => {
//  +            if(obj.children[val] && classNames.indexOf(obj.children[val].className) !== -1)
//  +                obj.children[val].parentNode.removeChild(obj.children[val]);
//  +            if(obj.children[val] && obj.children[val].children)
//  +                removeElementsByClass(obj.children[val], classNames);
//  +        });
//  +    }
//  +    return obj;
//  +}

// if we needed to modernize transition
// app.animation('.accordion-collapse-show', ['$animateCss', ($animateCss) => ({
// 	addClass: function(element, done) {
// 		return $animateCss(element, {
// 			from: { 'max-height': '0px' },
// 			to: { 'max-height': element[0].scrollHeight + 'px' },
// 			duration: 0.3 // in seconds
// 		})
// 		.start()['finally'](function(){
// 			element.css({ 'max-height': 'none'});
// 			done();
// 		});
// 	},
// 	removeClass: function(element, done) {
// 		element.css({ 'max-height': element[0].scrollHeight + 'px'});
// 		return $animateCss(element, {
// 			from: { 'max-height': element[0].scrollHeight + 'px' },
// 			to: { 'max-height':'0px' },
// 			duration: 0.3 // in seconds
// 		});
// 	}
// })]);
