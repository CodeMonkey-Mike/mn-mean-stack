'use strict';

angular.module('mnMeanApp')
  .factory('Award', ['$resource', function ($resource) {
    return $resource('/api/awards/:awardId',
      {awardId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
