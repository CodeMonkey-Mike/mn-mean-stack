'use strict';

angular.module('mnMeanApp')
  .directive('lightbox', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function(event) {
          event.preventDefault();
          $(this).ekkoLightbox();
        })
      }
    };
  });
