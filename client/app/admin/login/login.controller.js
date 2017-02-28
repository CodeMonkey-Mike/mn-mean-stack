'use strict';

angular.module('mnMeanApp')
  .controller('LoginCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('admin:profile');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  }]);
