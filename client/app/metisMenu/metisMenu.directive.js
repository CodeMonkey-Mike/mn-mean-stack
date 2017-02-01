'use strict';

angular.module('mnMeanApp')
  .directive('metisMenu', ['$timeout', '$window', function ($timeout, $window) {
    return {
      link: function (scope, element, attrs) {
        $timeout(function(){
          $(element).metisMenu();
        }, 100);

        // Loads the correct sidebar on window load,
        // collapses the sidebar on window resize.
        // Sets the min-height of #page-wrapper to window size
        angular.element($window).on('load resize', function() {
          //$(window).bind("load resize", function() {
          var topOffset = 50;
          var width = ($window.innerWidth > 0) ? $window.innerWidth : $window.screen.width;
          console.log('width: ', width);
          if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
          } else {
            $('div.navbar-collapse').removeClass('collapse');
          }

          var height = (($window.innerHeight > 0) ? $window.innerHeight : $window.screen.height) - 1;
          height = height - topOffset;
          console.log('height: ', height);
          if (height < 1) height = 1;
          if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
          }
        });

        var url = $window.location;
        var el = $('ul.nav a').filter(function() {
          return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').parent().parent().addClass('in').parent();
        if (el.is('li')) {
          el.addClass('active');
        }
      }
    };
  }]);
