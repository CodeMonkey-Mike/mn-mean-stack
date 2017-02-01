'use strict';

angular.module('mnMeanApp')
  .factory('Education', ['$resource', function ($resource) {
    return $resource('/api/educations/:educationId',
      {educationId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
