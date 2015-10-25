'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListItemDirective
 * @description
 * # StreamListItemDirective
 */
angular.module('troutSpotr')
  .directive('streamListItemHeader', function () {
    return {
      templateUrl: 'app/ui/streamList/streamListItem/StreamListItemHeaderTemplate.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
