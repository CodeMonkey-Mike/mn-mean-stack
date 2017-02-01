'use strict';

angular.module('mnMeanApp')
  .factory('Process', ['$resource', function ($resource) {
    return $resource('/api/processes/:processId',
      {processId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
