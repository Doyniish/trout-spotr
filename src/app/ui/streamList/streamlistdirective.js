'use strict';
/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListDirective
 * @description
 * # StreamListDirective
 */
angular.module('troutSpotr')
  .directive('streamList', ['StreamApiService',
    function(StreamApiService) {
      return {
        //app/ui/main/main.html
        templateUrl: 'app/ui/streamList/streamlisttemplate.html',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
          scope.stage = {
            isLoaded: false,
            streams: null,
            selectedStream: null
          };

          // scope.getScrollContainer = function() {
          //   return '#js-list-container';
          // };

          // scope.getRegionScrollBodyId = function(region) {
          //   var result = '#' + scope.getRegionId(region);
          //   return result;
          // };

          // scope.getRegionId = function(region) {
          //   var result = 'hdr-region_' + region.id;
          //   return result;
          // };

          scope.getScrollContainer = function() {
            return '#js-list-container';
          };

          scope.$watch('stage.selectedStream', function(newSelectedStream, oldSelectedStream) {
            if (newSelectedStream == null) {
              return;
            }
          });
        }
      };
    }
  ]);