'use strict';

angular.module('mnMeanApp')
  .controller('NavbarCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $state.go('main');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
