'use strict';
/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListDirective
 * @description
 * # StreamListDirective
 */
angular.module('troutSpotr')
  .directive('regionHeader', ['StreamApiService',
    function(StreamApiService) {
      return {
        //app/ui/main/main.html
        templateUrl: 'app/ui/streamList/region/RegionHeaderTemplate.html',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
          scope.displayedCounties = [];

          scope.init = function() {
            scope.clearCounties();  
          };

          scope.clearCounties = function() {
            scope.displayedCounties = [];
          };

          scope.loadMoreCounties = function(numberOfCountiesToAdd) {
            console.log('calling loadMoreStreams');
            var numberOfDisplayedCounties = scope.displayedCounties.length;
            var numberOfChildCounties = scope.region.children.length;

            numberOfCountiesToAdd = numberOfCountiesToAdd == null ? 1 : numberOfCountiesToAdd;
            var numberOfCountiesRemaining = numberOfChildCounties - numberOfDisplayedCounties;
            numberOfCountiesToAdd = Math.min(numberOfCountiesRemaining, numberOfCountiesToAdd);
            var finalIndex = numberOfDisplayedCounties + numberOfCountiesToAdd;
            console.log('Total counties: ', numberOfChildCounties);
            console.log('starting to add things from ', numberOfDisplayedCounties, ' to ', finalIndex);
            for (var i = numberOfDisplayedCounties; i < finalIndex; i++) {
              var countyToInject = scope.region.children[i];
              scope.displayedCounties.push(countyToInject);
              console.log('added county named ', countyToInject);
            }
          };

          scope.getScrollContainer = function() {
            return '#js-list-container';
          };

          scope.getRegionScrollBodyId = function(region) {
            var result = '#' + scope.getRegionId(region);
            return result;
          };

          scope.getRegionId = function(region) {
            var result = 'hdr-region_' + region.id;
            return result;
          };

          scope.init();
        }
      };
    }
  ]);