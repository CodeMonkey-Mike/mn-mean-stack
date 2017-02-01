'use strict';

angular.module('mnMeanApp')
  .controller('EducationCtrl', ['$scope', 'socket', 'Education', 'Modal',
    function ($scope, socket, Education, Modal) {

    $scope.educations = [];

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
  }]);
