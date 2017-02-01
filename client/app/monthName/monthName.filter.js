'use strict';

angular.module('mnMeanApp')
  .filter('monthName', function () {
    return function (monthNumber) {
      var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthNames[monthNumber - 1];
    };
  });
