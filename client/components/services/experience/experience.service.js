'use strict';

angular.module('mnMeanApp')
  .factory('Experience', ['$resource', function ($resource) {
    return $resource('/api/experiences/:experienceId',
      {experienceId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
