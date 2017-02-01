'use strict';

angular.module('mnMeanApp')
  .controller('ProfileCtrl', ['$scope', 'Profile', 'Modal', function ($scope, Profile, Modal) {

    Profile.get(function(profile) {
      $scope.profile = profile;
    });

    $scope.updateProfile = function() {
      Profile.update($scope.profile).$promise.then(function(data) {
        Modal.success('<p>Update profile successfully.</p>')
      }).catch(function(err) {
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          $scope.form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });
    };
  }]);
