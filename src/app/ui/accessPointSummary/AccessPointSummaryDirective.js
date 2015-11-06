angular.module('troutSpotr')
  .directive('accessPointSummary', [function() {
    'use strict';
    return {
      templateUrl: 'app/ui/accessPointSummary/AccessPointSummaryTemplate.html',
      restrict: 'A',
      link: function postLink(scope /*, element, attrs*/ ) {
        scope.stream.AccessPoints = _.uniq(scope.stream.AccessPoints, 'LinearOffset');
        var troutStreamIntersections = scope.stream.AccessPoints.filter(function(i) {
          return i.IsOverOrNearTroutStreamSection;
        });
        scope.denominator = troutStreamIntersections.length;
        var publicTroutStreamIntersections = troutStreamIntersections.filter(function(i) {
          return i.IsOverOrNearPublicLand;
        });
        scope.numerator = publicTroutStreamIntersections.length;
      }
    };
  }]);