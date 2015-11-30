app.directive('dashCenter', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/dashboard/dashCenter/dashCenter.html'
	};
});

app.animation('.fade-in', ['$animateCss', ($animateCss) => ({
	enter: function(element, doneFn) {
		return $animateCss(element, {
			from: { opacity: '0' },
			to: { opacity: '1' },
			duration: 0.5 // in seconds
		});
	}
})]);
