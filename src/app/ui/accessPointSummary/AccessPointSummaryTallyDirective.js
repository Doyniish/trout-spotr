angular.module('troutSpotr')
  .directive('accessPointSummaryTally', ['RectangleLayoutService', function(RectangleLayoutService) {
    'use strict';
    return {
      templateUrl: 'app/ui/accessPointSummary/AccessPointSummaryTallyTemplate.html',
      restrict: 'A',
      link: function postLink(scope , element/*, attrs*/ ) {
        var ROOT_CLASS = '.js-tally-root';
        var WIDTH = 32;
        var HEIGHT = 24;
        
        scope.stream.AccessPoints = _.uniq(scope.stream.AccessPoints, 'LinearOffset');
        var troutStreamIntersections = scope.stream.AccessPoints.filter(function(i) {
          return i.IsOverOrNearTroutStreamSection;
        }).sort(function(a) {
          return a.IsOverOrNearPublicLand ? -100 : 100;
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

        var generator = new RectangleLayoutService(WIDTH, HEIGHT);
        var dimensions = generator.getBoundingBox(scope.denominator);
        var numberOfColumns = dimensions[0];
        var numberOfRows = dimensions[1];

        var boxWidth = 4;

        var widthOfContainer = numberOfColumns * boxWidth;
        var heightOfContainer = numberOfRows * boxWidth;

        var offset = [(WIDTH - widthOfContainer) * 0.5, (HEIGHT - heightOfContainer) * 0.5];
        scope.root = d3.select(element[0]).select(ROOT_CLASS);
        scope.container = scope.root.append('g')
          .attr('class', 'access-points')
          .attr('transform', 'translate(' + offset[0] + ', ' + offset[1] + ')');

        scope.container.selectAll('circle')
          .data(troutStreamIntersections)
          .enter()
          .append('circle')
          .attr('data-length', scope.denominator)
          .attr('data-width', numberOfColumns)
          .attr('data-height', numberOfRows)
          .attr('cx', function(d, index) {
            var xPosition = ((index % numberOfColumns) * (boxWidth * 1.0));
            // console.log(xPosition);
            return xPosition;
          })
          .attr('cy', function(d, index) {
            var yPosition = Math.floor(index / numberOfColumns) * (boxWidth * 1.0);
            return yPosition;
          })
          .attr('r', boxWidth * 0.5)
          .attr('class', function(d) {
            return d.IsOverOrNearPublicLand ? 'numerator' : 'denominator';
          });


      }
    };
  }]);