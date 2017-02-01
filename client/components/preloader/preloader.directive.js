'use strict';

angular.module('mnMeanApp')
  .directive('preloader', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function() {
          element.fadeOut('slow');
        }, 1000);
      }
    };
  }]);
