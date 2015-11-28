app.directive('buildingAccordionAside', () => ({
	restrict: 'E',
	templateUrl: 'app/dashboard/buildingAccordionAside/buildingAccordionAside.html'
}));

app.animation('.accordion-collapse-show', ['$animateCss', ($animateCss) => ({
	addClass: function(element, doneFn) {
		console.log('element', element);
		return $animateCss(element, {
			from: { 'max-height': '0px' },
			to: { 'max-height': element[0].scrollHeight + 'px' },
			duration: 0.3 // in seconds
		});
	},
	removeClass: function(element, doneFn) {
		return $animateCss(element, {
			from: { 'max-height': element[0].scrollHeight + 'px' },
			to: { 'max-height':'0px' },
			duration: 0.3 // in seconds
		});
	}
})]);
