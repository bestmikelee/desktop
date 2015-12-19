app.directive('buildingAccordionAside', () => ({
	restrict: 'E',
	templateUrl: 'app/dashboard/buildingAccordionAside/buildingAccordionAside.html',
	link: (scope) => {
		var accordion = angular.element(document.querySelector('.accordion-list'))[0].children;
		// var accordion2 = accordion[0].children;
		var scrollTotal;
		setTimeout(() => {
			Array.prototype.forEach.call(accordion, (val, index, arr) =>
				index > 0
				&&
				(val = angular.element(val))
				&&
				val.css('transform','translateY(' + (arr[index-1].scrollHeight * -1 + 40) + 'px)')
				&&
				val.addClass('enable-transition'));
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
