'use strict';

angular.module('mnMeanApp')
  .factory('Contact', ['$resource', function ($resource) {
    return $resource('/api/contact', {}, {
        send: {
          method:'POST'
        }
      });
  }]);
