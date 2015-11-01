angular.module('troutSpotr')
  .factory('RectangleLayoutService', [function() {
    'use strict';

    function RectangleLayoutService(width, height) {
      this.width = width;
      this.height = height;
    }

    var proto = RectangleLayoutService.prototype;

    function getScale(width, height, itemLength) {
      return Math.sqrt(itemLength / (width * height));
    }

    function getXGivenY(width, height, y) {
      return (width / height) * y;
    }

    function getYGivenX(width, height, x) {
      return (height / width) * x;
    }

    function pythagoreanTheorem(x, y) {
      return Math.sqrt((x * x) + (y * y));
    }

    proto.getBoundingBox = function (numberOfItems) {
      if (numberOfItems === 1) {
        return [1, 1];
      }

      var scale = getScale(this.width, this.height, numberOfItems);
      var minimumXPosition = this.width * scale;
      var minimumYPosition = this.height * scale;

      var xPrime = Math.ceil(minimumXPosition);
      var yPrime = Math.ceil(minimumYPosition);

      var newYLength = getYGivenX(this.width, this.height, xPrime);
      var yZLength = pythagoreanTheorem(xPrime, newYLength);

      var newXLength = getXGivenY(this.width, this.height, yPrime);
      var xZLength = pythagoreanTheorem(newXLength, yPrime);

      var candidate = function() {
        if (xZLength > yZLength) {
          return [xPrime, Math.floor(minimumYPosition)];
        } else if (yZLength > xZLength) {
          return [Math.floor(minimumXPosition), yPrime];
        }
        return [Math.ceil(minimumXPosition), Math.ceil(minimumYPosition)];
      };

      var result = candidate();
      if (result[0] * result[1] < numberOfItems) {
        return [xPrime, yPrime];
      }
      return result;
    };

    
    return RectangleLayoutService;
  }]);