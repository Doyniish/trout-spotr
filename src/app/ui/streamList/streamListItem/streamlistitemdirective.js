'use strict';

/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListItemDirective
 * @description
 * # StreamListItemDirective
 */
angular.module('troutSpotr')
  .directive('streamListItemDirective', function() {
    return {
      templateUrl: 'app/ui/streamList/streamListItem/streamlistitemtemplate.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log(scope.stream);
        scope.isSmall = true;
        scope.stream.AccessPoints = _.uniq(scope.stream.AccessPoints, 'LinearOffset');
        scope.isAlertSymbolDisplayed = function() {
          if (scope.isSmall === false) {
            return false;
          }

          var isRestrictions = scope.stream.Restrictions.length > 0;
          var isMessage = scope.stream.AlertMessage != null && scope.stream.AlertMessage.length > 0;

          if (isRestrictions && isMessage) {
            return true;
          }
        };

        scope.getAlertMessage = function() {
          return scope.stream.AlertMessage;
        };

        scope.expand = function() {
          scope.isSmall = !scope.isSmall;
          console.log(scope.stream);
        };

        scope.getCounties = function() {
          if (!scope.stream.Counties) {
            return null;
          }

          return scope.stream.Counties.map(function(c) {
            return c.Name;
          }).join(',');
        };

        scope.getAlternativeNames = function() {
          if (!scope.stream.LocalNames) {
            return null;
          }

          if (scope.stream.LocalNames.length === 0) {
            return '';
          }

          return 'aka ' + scope.stream.LocalNames.join(',');
        };
      }
    };
  });