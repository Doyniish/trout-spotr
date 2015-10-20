'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:streamRatio
 * @description
 * # streamRatio
 */
angular.module('troutSpotr')
  .directive('streamRatio', function (StreamRatioViewModel) {
    return {
      templateUrl: 'app/ui/streamRatio/streamratiotemplate.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var model = new StreamRatioViewModel(scope.stream.TroutStreamsLength, scope.stream.PalsLength);
        scope.streamRatio = model;
      }
    };
  });
