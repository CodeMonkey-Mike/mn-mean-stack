'use strict';

angular.module('mnMeanApp')
  .controller('AwardCtrl', ['$scope', 'socket', 'Award', 'Modal', 'Data', 'demoMode',
    function ($scope, socket, Award, Modal, Data, demoMode) {
      $scope.awards = [];
      $scope.months = Data.months();
      $scope.demoMode = demoMode;

      Award.query(function(awards) {
        $scope.awards = awards;
        socket.syncUpdates('award', $scope.awards);
      });

      $scope.addAward = function() {
        if($scope.newAward === {}) {
          return;
        }
        Award.save({}, $scope.newAward).$promise.then(function(data) {
          Modal.success('<p>Add award successfully</p>').then(function() {
            // reset form
            $scope.newAward = {};
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

      $scope.delete = Modal.confirm.delete(function(award) {
        Award.remove({awardId: award._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('award');
      });
    }])
  .controller('AwardEditCtrl', ['$scope', '$stateParams', 'Award', 'Modal', 'Data', 'demoMode', 'award',
    function ($scope, $stateParams, Award, Modal, Data, demoMode, award) {
    $scope.award = award;
    $scope.months = Data.months();
    $scope.demoMode = demoMode;

    $scope.updateAward = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Award.update({awardId: $stateParams.awardId}, $scope.award).$promise.then(function(data) {
          Modal.success('<p>The award <strong>' + data.name + '</strong> has been successfully updated.</p>');
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

