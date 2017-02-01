'use strict';

angular.module('mnMeanApp')
  .controller('ServiceCtrl', ['$scope', 'socket', 'Service', 'Modal',
    function ($scope, socket, Service, Modal) {

      $scope.services = [];

      Service.query(function(services) {
        $scope.services = services;
        socket.syncUpdates('service', $scope.services);
      });

      $scope.addService = function() {
        if($scope.newService === {}) {
          return;
        }
        Service.save({}, $scope.newService).$promise.then(function(data) {
          Modal.success('<p>Add service successfully</p>').then(function() {
            // reset form
            $scope.newService = {};
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

      $scope.delete = Modal.confirm.delete(function(service) {
        Service.remove({serviceId: service._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('service');
      });
    }]);
