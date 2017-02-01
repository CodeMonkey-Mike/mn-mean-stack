'use strict';

angular.module('mnMeanApp')
  .directive('donutchart', ['$timeout', function ($timeout) {
    return {
      priority: -1,
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function() {
          element.donutchart({
            'bgColor' : 'transparent',
            'fgColor' : '#fff',
            'size' : 160,
            'donutwidth': 3,
            'textsize': 50
          });
          element.donutchart("animate");
        }, 1000);
      }
    };
  }]);
