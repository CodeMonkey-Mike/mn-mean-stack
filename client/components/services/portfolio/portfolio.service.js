'use strict';

angular.module('mnMeanApp')
  .factory('Portfolio', ['$resource', function ($resource) {
    return $resource('/api/portfolios/:portfolioId',
      {portfolioId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
