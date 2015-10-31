'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:restrictionLegend
 * @description
 * # restrictionLegend
 */
angular.module('troutSpotr')
  .directive('restrictionLegend', function () {
    return {
      templateUrl: 'app/ui/restrictions/restrictionlegendtemplate.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	console.log('restrictionlegend directive', scope.stream);
      }
    };
  });
