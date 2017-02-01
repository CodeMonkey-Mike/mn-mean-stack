'use strict';

angular.module('mnMeanApp')
  .factory('Service', ['$resource', function ($resource) {
    return $resource('/api/services/:serviceId',
      {serviceId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
