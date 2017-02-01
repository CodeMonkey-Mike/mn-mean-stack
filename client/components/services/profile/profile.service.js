'use strict';

angular.module('mnMeanApp')
  .factory('Profile', ['$resource', function ($resource) {
    return $resource('/api/profile',
      {}, {
        update: {
          method:'POST'
        }
      });
  }]);


