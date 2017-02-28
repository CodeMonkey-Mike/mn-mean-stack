'use strict';

angular.module('mnMeanApp')
  .controller('ProcessCtrl', ['$scope', 'socket', 'Process', 'Modal', 'demoMode',
    function ($scope, socket, Process, Modal, demoMode) {

      $scope.processes = [];
      $scope.demoMode = demoMode;

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

      $scope.sortableOptions = {
        helper: function (e, ui) {
          ui.children().each(function() {
            $(this).width($(this).width());
          });
          return ui;
        },
        stop: function(e, ui) {
          // this callback has the changed model
          $scope.processes.forEach(function(process, index) {
            process.sequence = index;
            if (!$scope.demoMode) {
              Process.update({processId: process._id}, process);
            }
          });
        }
      };

      $scope.delete = Modal.confirm.delete(function(process) {
        Process.remove({processId: process._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('process');
      });
    }])
  .controller('ProcessEditCtrl', ['$scope', '$stateParams', 'Process', 'Modal', 'demoMode', 'process',
    function ($scope, $stateParams, Process, Modal, demoMode, process) {
      $scope.process = process;
      $scope.demoMode = demoMode;

      $scope.updateProcess = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Process.update({processId: $stateParams.processId}, $scope.process).$promise.then(function(data) {
          Modal.success('<p>The process <strong>' + data.name + '</strong> has been successfully updated.</p>');
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
