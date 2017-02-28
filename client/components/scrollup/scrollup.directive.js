'use strict';

angular.module('mnMeanApp')
  .directive('scrollup', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function(event) {
          event.preventDefault();
          $("html, body").animate({ scrollTop: 0 }, 600);
          return false;
        });

        scope.$on('$destroy', function() {
          element.unbind('click');
        })
      }
    };
  });
