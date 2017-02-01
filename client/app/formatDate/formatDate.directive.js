'use strict';

angular.module('mnMeanApp')
  .directive('formatDate', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue) {
          return new Date(modelValue);
        });
      }
    };
  });
