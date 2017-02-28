'use strict';

angular.module('mnMeanApp')
  .factory('Channel', ['$resource', function ($resource) {
    return $resource('/api/channels/:channelId',
      {channelId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
