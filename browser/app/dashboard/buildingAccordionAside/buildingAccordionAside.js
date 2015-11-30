app.directive('buildingAccordionAside', () => ({
	restrict: 'E',
	templateUrl: 'app/dashboard/buildingAccordionAside/buildingAccordionAside.html'
}));

// if we needed to modernize transition
app.animation('.accordion-collapse-show', ['$animateCss', ($animateCss) => ({
	addClass: function(element, done) {
		return $animateCss(element, {
			from: { 'max-height': '0px' },
			to: { 'max-height': element[0].scrollHeight + 'px' },
			duration: 0.3 // in seconds
		})
		.start()['finally'](function(){
			element.css({ 'max-height': 'none'});
			done();
		});
	},
	removeClass: function(element, done) {
		element.css({ 'max-height': element[0].scrollHeight + 'px'});
		return $animateCss(element, {
			from: { 'max-height': element[0].scrollHeight + 'px' },
			to: { 'max-height':'0px' },
			duration: 0.3 // in seconds
		});
	}
})]);
