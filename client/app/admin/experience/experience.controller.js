'use strict';

angular.module('mnMeanApp')
  .controller('ExperienceCtrl', ['$scope', 'socket', 'Experience', 'Modal',
    function ($scope, socket, Experience, Modal) {

      $scope.experiences = [];

      Experience.query(function(experiences) {
        $scope.experiences = experiences;
        socket.syncUpdates('experience', $scope.experiences);
      });

      $scope.addExperience = function() {
        if($scope.newExperience === {}) {
          return;
        }
        Experience.save({}, $scope.newExperience).$promise.then(function(data) {
          Modal.success('<p>Add experience successfully</p>').then(function() {
            // reset form
            $scope.newExperience = {};
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

      $scope.delete = Modal.confirm.delete(function(experience) {
        Experience.remove({experienceId: experience._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('experience');
      });
    }]);
