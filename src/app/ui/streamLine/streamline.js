'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:streamLine
 * @description
 * # streamLine
 */
angular.module('troutSpotr')
  .directive('streamLine', function(LinearReferenceViewModel) {
    return {
      templateUrl: 'app/ui/streamLine/streamlinetemplate.html',
      restrict: 'A',
      link: function(scope, element, attrs) {
        var length = parseFloat(scope.stream.LengthMiles);
        if (length <= 0) {
          return;
        }
        var inverseLength = 1 / length;
        scope.stage = {
          width: element.width() - 10
        };

        var ANIMATION_SPEED = 500;

        var createTickMarks = function(LengthMiles) {
          var clampedLength = Math.floor(length);
          var tickMarks = [];
          if (clampedLength < 1) {
            tickMarks.push({
              xOffset: 0,
              width: 1,
              height: 3,
              yOffset: 7
            });

            return tickMarks;
          }

          var tickWidth = scope.stage.width / LengthMiles;
          for (var i = 0; i <= clampedLength; i++) {
            tickMarks.push({
              xOffset: i * tickWidth,
              width: 1.5,
              height: 4,
              yOffset: 8
            });
          }

          return tickMarks;
        };


        scope.drawLines = function() {

          var length = parseFloat(scope.stream.LengthMiles);
          var inverseLength = 1 / length;
          scope.streamLine = d3.select(element[0])
            .append('svg')
            .attr('class', 'stream-line')
            .attr('width', scope.stage.width)
            .attr('height', 16)
            .attr('xmlns', 'http://www.w3.org/2000/svg');

          // PUBLIC LAND
          // Prepare
          scope.publicSegments = scope.stream.Pal.Sections.map(function(segment) {
            return new LinearReferenceViewModel(segment, inverseLength);
          });

          // Stage
          scope.streamLine.publicLand = scope.streamLine.append('g')
            .attr('class', 'stream-line_public-land');

          // Execute
          scope.streamLine.publicLand.selectAll('rect')
            .data(scope.publicSegments).enter()
            .append('rect')
            .attr('x', function(d) {
              return d.xOffset * scope.stage.width;
            })
            .attr('y', 0)
            .attr('width', function(d) {
              return d.width * scope.stage.width;
            })
            .attr('height', 11)
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('class', 'public-land')
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(3 * ANIMATION_SPEED)
            .attr('style', 'opacity: 1');

          // LAKES
          // Prepare
          scope.lakes = scope.stream.Lakes.Sections.map(function(segment) {
            return new LinearReferenceViewModel(segment, inverseLength);
          });

          

          // Stage
          scope.streamLine.lakes = scope.streamLine.append('g')
            .attr('class', 'stream-line_stream'); // TODO: CHANGE TO LAKE CLASS

          // Execute
          scope.streamLine.lakes.selectAll('rect')
            .data(scope.lakes).enter()
            .append('rect')
            .attr('x', function(d) {
              return d.xOffset * scope.stage.width;
            })
            .attr('y', 1)
            .attr('width', function(d) {
              return d.width * scope.stage.width;
            })
            .attr('height', 9)
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('class', 'stream-line_stream')
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(5 * ANIMATION_SPEED)
            .attr('style', 'opacity: 1');

          var tickMarks = createTickMarks(length);
          var firstMark = tickMarks[0];

          firstMark.width = 1;
          firstMark.height = 5;
          scope.streamLine.tickMarks = scope.streamLine
            .append('g')
            .attr('class', 'stream-line_grid-lines')
            .selectAll('rect').data(tickMarks).enter()
            .append('rect')
            .attr('x', function(d) {
              return scope.stage.width - d.xOffset - d.width;
            })
            .attr('y', function(d) {
              return d.yOffset - 2;
            })
            .attr('width', function(d) {
              return d.width;
            })
            .attr('height', function(d) {
              return d.height;
            })
            .attr('class', 'tick')
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(function(d, i) {
              return (500 / tickMarks.length) * i + (0.5 * ANIMATION_SPEED);
            })
            .attr('style', 'opacity: 1');;


          // STREAM LINE
          scope.streamLine.stream = scope.streamLine.append('g')
            .attr('class', 'stream-line_stream')
            .append('rect')
            .attr('x', 0)
            .attr('y', 5)
            .attr('height', 1)
            .attr('width', scope.stage.width)
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(0.1 * ANIMATION_SPEED)
            .attr('style', 'opacity: 1');


            scope.accessPoints = scope.stream.AccessPoints;

          



          // TROUT STREAM SECTIONS
          scope.publicSegments = scope.stream.TroutStreams.Sections.map(function(segment) {
            return new LinearReferenceViewModel(segment, inverseLength);
          });

          // Stage
          scope.streamLine.troutStreamSections = scope.streamLine.append('g')
            .attr('class', 'stream-line_route');

          // Execute
          scope.streamLine.append('g')
            .attr('class', 'stream-line_route')
            .selectAll('g').data(scope.publicSegments).enter()
            .append('g')
            .append('rect')
            .attr('x', function(d) {
              return d.xOffset * scope.stage.width;
            })
            .attr('y', 3)
            .attr('width', function(d) {
              return d.width * scope.stage.width;
            })
            .attr('height', 5)
            .attr('class', 'stream-line_route')
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(2 * ANIMATION_SPEED)
            .attr('style', 'opacity: 1');

          // RESTRICTIONS
          scope.stream.Restrictions.forEach(function(restriction, index) {

            var restrictionModels = restriction.Sections.map(function(segment) {
              var linearReferenceViewModel = new LinearReferenceViewModel(segment, inverseLength);
              segment.segment = linearReferenceViewModel;
              return segment;
            });

            scope.streamLine.append('g')
              .attr('class', index === 0 ? 'stream-line_restriction' : 'stream-line_restriction_secondary')
              .selectAll('g').data(restrictionModels).enter()
              .append('g')
              // .selectAll('rect').data(function(d) {
              //     return d.segment;
              // }).enter()
              .append('rect')
              .attr('x', function(d) {
                return d.segment.xOffset * scope.stage.width;
              })
              .attr('y', 3)
              .attr('width', function(d) {
                return d.segment.width * scope.stage.width;
              })
              .attr('height', 5)
              .attr('class', 'restriction')
              .attr('style', 'opacity: 0;')
              .transition()
              .delay(5 * ANIMATION_SPEED)
              .attr('style', 'opacity: 1');
          });

          scope.streamLine.roadIntersections = scope.streamLine.append('g')
            .attr('class', 'stream-line_roadIntersections');


          scope.streamLine.roadIntersections.selectAll('circle')
            .data(scope.accessPoints).enter()
            .append('circle')
            .attr('cy', 5.5)
            .attr('r', 3)
            .attr('cx', function(d) {
              return (1 - (d.LinearOffset / length)) * scope.stage.width;
            })
            .attr('class', function(d) {
              var isUninteresting = d.IsOverOrNearPublicLand === false && d.IsOverOrNearTroutStreamSection === false;
              if (isUninteresting) {
                return 'roadIntersetion_inactive';
              }

              if (d.IsOverOrNearPublicLand === false) {
                return 'roadIntersetion_private';
              }
              return 'roadIntersetion_public';
            })
            .attr('style', 'opacity: 0;')
            .transition()
            .delay(function(d, i) {
              return (500 / scope.accessPoints.length) * i + (4 * ANIMATION_SPEED);
            })
            .attr('style', 'opacity: 1');

          
        };



        scope.drawLines();
      }
    };
  });