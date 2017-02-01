'use strict';

angular.module('mnMeanApp')
  .directive('animated', function () {
    return {
      priority: -3,
      restrict: 'C',
      link: function (scope, element, attrs) {
        element.appear(function() {
          var elem = $(this);
          var animation = elem.data('animation');
          if ( !elem.hasClass('visible') ) {
            var animationDelay = elem.data('animation-delay');
            if ( animationDelay ) {

              setTimeout(function(){
                elem.addClass( animation + " visible" );
                if (elem.attr('id') === 'myskills-carousel') {
                  $( "div[id*='donutchart']" ).donutchart("animate");
                }
              }, animationDelay);

            } else {
              elem.addClass( animation + " visible" );
            }
          }
        });
      }
    };
  });
