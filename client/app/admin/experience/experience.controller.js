'use strict';

angular.module('mnMeanApp')
  .controller('ExperienceCtrl', ['$scope', 'socket', 'Experience', 'Modal', 'Data', 'demoMode',
    function ($scope, socket, Experience, Modal, Data, demoMode) {
      $scope.experiences = [];
      $scope.months = Data.months();
      $scope.demoMode = demoMode;

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

      $scope.sortableOptions = {
        helper: function (e, ui) {
          ui.children().each(function() {
            $(this).width($(this).width());
          });
          return ui;
        },
        stop: function(e, ui) {
          // this callback has the changed model
          $scope.experiences.forEach(function(experience, index) {
            experience.sequence = index;
            Experience.update({experienceId: experience._id}, experience);
          });
        }
      };

      $scope.delete = Modal.confirm.delete(function(experience) {
        Experience.remove({experienceId: experience._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('experience');
      });
    }])
  .controller('ExperienceEditCtrl', ['$scope', '$stateParams', 'Experience', 'Modal', 'Data', 'demoMode', 'experience',
    function ($scope, $stateParams, Experience, Modal, Data, demoMode, experience) {
      $scope.experience = experience;
      $scope.months = Data.months();
      $scope.demoMode = demoMode;

      $scope.updateExperience = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Experience.update({experienceId: $stateParams.experienceId}, $scope.experience).$promise.then(function(data) {
          Modal.success('<p>The experience <strong>' + data.name + '</strong> has been successfully updated.</p>');
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
