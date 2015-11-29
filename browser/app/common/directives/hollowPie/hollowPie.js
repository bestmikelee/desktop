app.directive('hollowPie', function($timeout, $interval, $rootScope) {

    var DURATION = 1500;
    var INNER_CIRCLE_DELAY = DURATION*1/3;

    function hollowPieLink(scope, element, attrs) {
        // store percentages in array
        scope.percentageData = scope.percentageData || [];

        // Re-draw pies upon changes to 'passedData'
        scope.$watch('passedData', (newVal, oldVal) =>
            $timeout(() =>
            ಠ_ಠ(scope)),true);
    }

    function drawPieChart(elementId, data) {
        // TODO code duplication check how you can avoid that
        var containerEl = document.getElementById(elementId),
            width = containerEl.clientWidth,
            height = width * 0.4,
            radius = Math.min(width, height) / 2 - 10, //adjust pie radius here
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
            .value((d) => d.value);

        // Define arc-ing function which declares the shape of the pie chart (full circle or no, hollow or no), in this case it's actually a regular pie chart that we put a white circle on top of lol
        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);

        // Input data and make animation :)
        var pieChartPieces = pie.datum(data)
            .selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('class', (d) =>  'pie_chart_' + d.data.color)
            .attr('d', arc)
            .each(function() {
                this._current = this._current || { //to make transition work need to figure out how to include previous values here
                    startAngle: 0,
                    endAngle: 0
                };
            })
            .transition()
            .duration(DURATION)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(d);
                return (t) => arc(interpolate(t));
            });

        // Hollow the pie!
        drawChartCenter(pie, radius);
    }

    // Handles "hollowing" the pie
    function drawChartCenter(pie, radius) {
        pie.append('g').append('circle')
            .attr('class', 'pie_chart_inner_circle')
            .attr('r', 0)
            .transition()
            .delay(INNER_CIRCLE_DELAY)
            .duration(DURATION)
            .attr('r', Math.max(radius - 30, radius * 0.35));
    }

    // Handles incrementing values+percentages
    function percentClimber(pieId, newData, currentData) {
        const start = !currentData.length;
        if(start) {
            for (var i = 0; i < newData.length; i++) {
                currentData.push({
                    value: 0,
                    count: 0,
                    description: newData[i].description
                });
            }
        }
        $timeout(() => {
            for (var i = 0; i < currentData.length; i++) {
                incrementTo(currentData[i], newData[i], 'count');
                incrementTo(currentData[i], newData[i], 'value');
            }
        }, start ? 800 : 200); //wait 1 second on initial load, .2 seconds when moving between buildings
    }

    // Manages actual incrementing
    function incrementTo(startVal, endVal, prop){
        const interval = $interval(() =>
            startVal[prop] < endVal[prop] ?
            startVal[prop]++ :
            startVal[prop] > endVal[prop] ?
            startVal[prop]-- :
            $interval.cancel(interval),
            300/Math.abs(startVal[prop] - endVal[prop])); //make full increment time = 500ms
    }

    // Build chart
    function ಠ_ಠ(scope) {
        // hide if specific apartment is selected
        scope.asideDataHide = true;
        if (scope.passedData.length) {
            drawPieChart(scope.pieId, scope.passedData);
            scope.asideDataHide = false;
            percentClimber(scope.pieId, scope.passedData, scope.percentageData);
        }
    }

    // return directive
    return {
        restrict: 'E',
        scope: {
            passedData: '=',
            pieId: '='
        },
        templateUrl: 'app/common/directives/hollowPie/hollowPie.html',
        link: hollowPieLink,
        controller: function($scope){
            // allow Math in interpolation
            $scope.Math = window.Math;

            // initialize with aside data hidden
            $scope.asideDataHide = true;
        }
    };
});
