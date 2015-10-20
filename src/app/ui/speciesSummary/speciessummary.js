'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:speciesSummary
 * @description
 * # speciesSummary
 */
angular.module('troutSpotr')
  .directive('speciesSummary', function () {
    return {
      templateUrl: 'app/ui/speciesSummary/speciessummarytemplate.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
