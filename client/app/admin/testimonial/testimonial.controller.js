'use strict';

angular.module('mnMeanApp')
  .controller('TestimonialCtrl', ['$scope', 'socket', 'Testimonial', 'Modal', 'demoMode',
    function ($scope, socket, Testimonial, Modal, demoMode) {

      $scope.testimonials = [];
      $scope.demoMode = demoMode;

      Testimonial.query(function(testimonials) {
        $scope.testimonials = testimonials;
        socket.syncUpdates('testimonial', $scope.testimonials);
      });

      $scope.addTestimonial = function() {
        if($scope.newTestimonial === {}) {
          return;
        }
        Testimonial.save({}, $scope.newTestimonial).$promise.then(function(data) {
          Modal.success('<p>Add testimonial successfully</p>').then(function() {
            // reset form
            $scope.newTestimonial = {};
          });
        }).catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            $scope.form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      };

      $scope.delete = Modal.confirm.delete(function(testimonial) {
        Testimonial.remove({testimonialId: testimonial._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('testimonial');
      });
    }])
  .controller('TestimonialEditCtrl', ['$scope', '$stateParams', 'Testimonial', 'Modal', 'demoMode', 'testimonial',
    function ($scope, $stateParams, Testimonial, Modal, demoMode, testimonial) {
      $scope.testimonial = testimonial;
      $scope.demoMode = demoMode;

      $scope.updateTestimonial = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Testimonial.update({testimonialId: $stateParams.testimonialId}, $scope.testimonial).$promise.then(function(data) {
          Modal.success('<p>The testimonial <strong>' + data.name + '</strong> has been successfully updated.</p>');
        }).catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            $scope.form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  }]);

