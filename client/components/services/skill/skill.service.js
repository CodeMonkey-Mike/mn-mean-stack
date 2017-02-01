'use strict';

angular.module('mnMeanApp')
  .factory('Skill', ['$resource', function ($resource) {
    return $resource('/api/skills/:skillId',
      {skillId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
