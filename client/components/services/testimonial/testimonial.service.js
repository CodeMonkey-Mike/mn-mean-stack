'use strict';

angular.module('mnMeanApp')
  .factory('Testimonial', ['$resource', function ($resource) {
    return $resource('/api/testimonials/:testimonialId',
      {testimonialId: '@_id'}, {
        update: {
          method:'PUT'
        }
      });
  }]);
