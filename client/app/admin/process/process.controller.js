'use strict';

angular.module('mnMeanApp')
  .controller('ProcessCtrl', ['$scope', 'socket', 'Process', 'Modal',
    function ($scope, socket, Process, Modal) {

      $scope.processes = [];

      Process.query(function(processes) {
        $scope.processes = processes;
        socket.syncUpdates('process', $scope.processes);
      });

      $scope.addProcess = function() {
        if($scope.newProcess === {}) {
          return;
        }
        Process.save({}, $scope.newProcess).$promise.then(function(data) {
          Modal.success('<p>Add process successfully</p>').then(function() {
            // reset form
            $scope.newProcess = {};
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

      $scope.delete = Modal.confirm.delete(function(process) {
        Process.remove({processId: process._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('process');
      });
    }]);
