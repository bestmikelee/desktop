app.directive('hollowPie', function($timeout, $interval, $rootScope) {

    var hollowPieLink = function(scope, element, attrs) {

        var DURATION = 1500;
        var DELAY = 700;

        // store percentages in array
        scope.percentageData = [];

        /**
         * draw the fancy pie chart
         *
         * @param {String} elementId elementId
         * @param {Array}  data      data
         */

        function drawPieChart(elementId, data) {
            // TODO code duplication check how you can avoid that
            var containerEl = document.getElementById(elementId),
                width = containerEl.clientWidth,
                height = width * 0.4,
                radius = Math.min(width, height) / 2,
                container = d3.select(containerEl),
                svg = container.select('svg')
                .attr('width', width)
                .attr('height', height);

            // Wipe old chart
            svg.selectAll('g:not(.dont-remove)').remove();

            // Create pie area
            var pie = svg.append('g')
                .attr(
                    'transform',
                    'translate(' + width / 2 + ',' + height / 2 + ')'
                );

            // specifies the expected format for data to be read in
            var pieData = d3.layout.pie()
                .value(function(d) {
                    return d.value;
                });

            // Define arc-ing function which declares the shape of the pie chart (full circle or no, hollow or no), in this case it's actually a regular pie chart that we put a white circle on top of lol
            var arc = d3.svg.arc()
                .outerRadius(radius - 20)
                .innerRadius(0);

            // Input data and make animation :)
            var pieChartPieces = pie.datum(data)
                .selectAll('path')
                .data(pieData)
                .enter()
                .append('path')
                .attr('class', function(d) {
                    return 'pieChart__' + d.data.color;
                })
                .attr('d', arc)
                .each(function() {
                    this._current = {
                        startAngle: 0,
                        endAngle: 0
                    };
                })
                .transition()
                .duration(DURATION)
                .attrTween('d', function(d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });

            // Hollow the pie!
            drawChartCenter(pie, radius);
        }

        // Handles "hollowing" the pie
        function drawChartCenter(pie, radius) {
            var centerContainer = pie.append('g')
                .attr('class', 'pieChart--center');

            centerContainer.append('circle')
                .attr('id', scope.pieId + '-clippy')
                .attr('class', 'pieChart--center--innerCircle')
                .attr('r', 0)
                .transition()
                .delay(DELAY)
                .duration(DURATION)
                .attr('r', radius - 52);
        }

        // Directs incrementing percentages
        function percentClimber(){
            var start = false;
            if(!scope.percentageData.length) {
                for (var i = 0; i < scope.passedData.length; i++) {
                    scope.percentageData.push({
                        value: 0,
                        count: 0,
                        description: scope.passedData[i].description
                    });
                }
                start = true;
            }
            $timeout(function(){
                for (var i = 0; i < scope.percentageData.length; i++) {
                    incrementTo(scope.percentageData[i], scope.passedData[i], 'value');
                    incrementTo(scope.percentageData[i], scope.passedData[i], 'count');
                }
            }, start ? 1000: 200); //wait 1 second on initial load, .2 seconds when moving between buildings
        }

        // Manages actual incrementing
        function incrementTo(startVal, endVal, prop){
            var interval = $interval(function () {
                if(startVal[prop] < endVal[prop]) {
                    startVal[prop]++;
                } else if(startVal[prop] > endVal[prop]) {
                    startVal[prop]--;
                } else {
                    $interval.cancel(interval);
                }
            }, 500/Math.abs(startVal[prop]-endVal[prop]));
        }

        // Build chart
        function ಠ_ಠ() {
            // hide if specific apartment is selected
            if (scope.passedData.length) {
                drawPieChart(scope.pieId, scope.passedData);
                percentClimber();
            }
        }

        // Re-draw pies upon changes to 'passedData'
        scope.$watch('passedData', function(newVal, oldVal) {
            $timeout(function(){
                ಠ_ಠ();
            });
        },true);
    };

    return {
        restrict: 'E',
        scope: {
            passedData: '=',
            pieId: '='
        },
        templateUrl: 'app/common/directives/hollowPie/hollowPie.html',
        link: hollowPieLink,
        controller: function($scope){
            //allow Math in interpolation
            $scope.Math = window.Math;
        }
    };
});
