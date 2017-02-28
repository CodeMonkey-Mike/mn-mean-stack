'use strict';

angular.module('mnMeanApp')
  .controller('EducationCtrl', ['$scope', 'socket', 'Education', 'Modal', 'Data', 'demoMode',
    function ($scope, socket, Education, Modal, Data, demoMode) {
    $scope.educations = [];
    $scope.months = Data.months();
    $scope.demoMode = demoMode;

    Education.query(function(educations) {
      $scope.educations = educations;
      socket.syncUpdates('education', $scope.educations);
    });

    $scope.addEducation = function() {
      if($scope.newEducation === {}) {
        return;
      }
      Education.save({}, $scope.newEducation).$promise.then(function(data) {
        Modal.success('<p>Add skill successfully</p>').then(function() {
          // reset form
          $scope.newEducation = {};
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

    $scope.delete = Modal.confirm.delete(function(education) {
      Education.remove({educationId: education._id}).$promise.catch(function(err) {
        Modal.alert(err.data.message);
      });
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('education');
    });
  }])
  .controller('EducationEditCtrl', ['$scope', '$stateParams', 'Education', 'Modal', 'Data', 'demoMode', 'education',
    function ($scope, $stateParams, Education, Modal, Data, demoMode, education) {
      $scope.education = education;
      $scope.months = Data.months();
      $scope.demoMode = demoMode;

      $scope.updateEducation = function() {
        $scope.submitted = true;
        if ($scope.form.$valid) {
          Education.update({educationId: $stateParams.educationId}, $scope.education).$promise.then(function(data) {
            Modal.success('<p>The education <strong>' + data.name + '</strong> has been successfully updated.</p>');
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
