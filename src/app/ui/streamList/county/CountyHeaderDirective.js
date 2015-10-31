'use strict';
/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListDirective
 * @description
 * # StreamListDirective
 */
angular.module('troutSpotr')
  .directive('countyHeader', ['StreamApiService',
    function(StreamApiService) {
      return {
        //app/ui/main/main.html
        templateUrl: 'app/ui/streamList/county/CountyHeaderTemplate.html',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
          scope.displayedStreams = [];

          scope.init = function() {
            scope.clearStreams();  
          };

          scope.clearStreams = function() {
            scope.displayedStreams = [];
          };

          scope.loadMoreStreams = function(numberOfStreamsToAdd) {
            console.log('calling loadMoreStreams');
            var numberOfDisplayedStreams = scope.displayedStreams.length;
            var numberOfChildStreams = scope.county.children.length;

            numberOfStreamsToAdd = numberOfStreamsToAdd == null ? 15 : numberOfStreamsToAdd;
            var numberOfStreamsRemaining = numberOfChildStreams - numberOfDisplayedStreams;
            numberOfStreamsToAdd = Math.min(numberOfStreamsRemaining, numberOfStreamsToAdd);
            var finalIndex = numberOfDisplayedStreams + numberOfStreamsToAdd;
            console.log('Total streams: ', numberOfChildStreams);
            console.log('starting to add things from ', numberOfDisplayedStreams, ' to ', finalIndex);
            for (var i = numberOfDisplayedStreams; i < finalIndex; i++) {
              var streamToInject = scope.county.children[i];
              scope.displayedStreams.push(streamToInject);
              console.log('added stream named ', streamToInject);
            }
          };

          scope.getCountyScrollBodyId = function(county) {
            var result = '#' + scope.getCountyId(county);
            console.log(result);
            return result;
            // return '';
          };

          scope.getScrollContainer = function() {
            return '#js-list-container';
          };

          scope.getCountyId = function(county) {
            return 'hdr-county_' + county.id;
            // return '';
          };

          scope.init();
        }
      };
    }
  ]);