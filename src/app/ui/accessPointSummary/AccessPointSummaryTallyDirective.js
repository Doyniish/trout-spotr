angular.module('troutSpotr')
  .directive('accessPointSummaryTally', [function() {
    'use strict';
    return {
      templateUrl: 'app/ui/accessPointSummary/AccessPointSummaryTallyTemplate.html',
      restrict: 'A',
      link: function postLink(scope , element/*, attrs*/ ) {
        var ROOT_CLASS = '.js-tally-root';
        var WIDTH = 24;
        var HEIGHT = 24;

        var troutStreamIntersections = scope.stream.AccessPoints.filter(function(i) {
          return i.IsOverOrNearTroutStreamSection;
        });
        scope.denominator = troutStreamIntersections.length;
        var publicTroutStreamIntersections = troutStreamIntersections.filter(function(i) {
          return i.IsOverOrNearPublicLand;
        });
        scope.numerator = publicTroutStreamIntersections.length;
        scope.rows = Math.ceil(Math.sqrt(scope.denominator));
        if (scope.rows === 0) {
          return;
        }

        // if (scope.rows > 3) { debugger};


        var boxWidth = (WIDTH / scope.rows);
        scope.box = d3.select(element[0]).select(ROOT_CLASS);

        scope.box.selectAll('rect')
          .data(troutStreamIntersections)
          .enter()
          .append('rect')
          .attr('x', function(d, index) {
            var xPosition = ((index % scope.rows) * boxWidth) + (boxWidth * 0.9);
            // console.log(xPosition);
            return xPosition;
          })
          .attr('y', function(d, index) {
            var yPosition = Math.floor(index / scope.rows) * boxWidth + (boxWidth * 0.9);
            return yPosition;
          })
          .attr('width', boxWidth)
          .attr('height', boxWidth)
          .attr('class', function(d) {
            return d.IsOverOrNearPublicLand ? 'numerator' : 'denominator';
          });


      }
    };
  }]);