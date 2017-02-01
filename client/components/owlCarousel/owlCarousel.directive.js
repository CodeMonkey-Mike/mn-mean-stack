'use strict';

angular.module('mnMeanApp')
  .directive('owlCarousel', ['$timeout', function ($timeout) {
    return {
      priority: -2,
      restrict: 'A',
      scope: {
        options: '=owlCarouselOptions'
      },
      link: function (scope, element, attrs) {
        $timeout(function() {
          element.owlCarousel(scope.options);
        }, 2000);
      }
    };
  }]);
