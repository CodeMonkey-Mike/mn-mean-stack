'use strict';

angular.module('mnMeanApp')
  .directive('revolution', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var revapi = element.revolution(
          {
            delay:12000,
            startwidth:1170,
            startheight:500,
            hideThumbs:10,
            fullWidth:"off",
            fullScreen:"on",
            fullScreenOffsetContainer: "",
            hideCaptionAtLimit:400
          });
      }
    };
  });
