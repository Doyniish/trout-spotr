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
            var numberOfDisplayedStreams = scope.displayedStreams.length;
            var numberOfChildStreams = scope.county.children.length;

            numberOfStreamsToAdd = numberOfStreamsToAdd == null ? 30 : numberOfStreamsToAdd;
            var numberOfStreamsRemaining = numberOfChildStreams - numberOfDisplayedStreams;
            numberOfStreamsToAdd = Math.min(numberOfStreamsRemaining, numberOfStreamsToAdd);
            var finalIndex = numberOfDisplayedStreams + numberOfStreamsToAdd;
            for (var i = numberOfDisplayedStreams; i < finalIndex; i++) {
              var streamToInject = scope.county.children[i];
              scope.displayedStreams.push(streamToInject);
            }
          };

          scope.getCountyScrollBodyId = function(county) {
            var result = '#' + scope.getCountyId(county);
            return result;
          };

          scope.getScrollContainer = function() {
            return '#js-list-container';
          };

          scope.getCountyId = function(county) {
            return 'hdr-county_' + county.id;
          };

          scope.init();
        }
      };
    }
  ]);