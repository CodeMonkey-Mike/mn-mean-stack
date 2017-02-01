'use strict';

angular.module('mnMeanApp')
  .directive('onePageNav', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.onePageNav({
          filter: ':not(.external)',
          begin: function() {
          },
          end: function() {
          }
        });
      }
    };
  });
