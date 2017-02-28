'use strict';

angular.module('mnMeanApp')
  .controller('ChannelCtrl', ['$scope', 'socket', 'Channel', 'Modal', 'demoMode',
    function ($scope, socket, Channel, Modal, demoMode) {
      $scope.base = {url: '', icon: '', visible: true};
      $scope.newChannel = angular.copy($scope.base);
      $scope.channels = [];
      $scope.demoMode = demoMode;

      Channel.query(function(channels) {
        $scope.channels = channels;
        socket.syncUpdates('channel', $scope.channels);
      });

      $scope.addChannel = function() {
        if($scope.newChannel === {}) {
          return;
        }
        Channel.save({}, $scope.newChannel).$promise.then(function(data) {
          Modal.success('<p>Add social channel successfully</p>').then(function() {
            // reset form
            $scope.newChannel = angular.copy($scope.base);
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
          $scope.channels.forEach(function(channel, index) {
            channel.sequence = index;
            if (!$scope.demoMode) {
              Channel.update({channelId: channel._id}, channel);
            }
          });
        }
      };

      $scope.delete = Modal.confirm.delete(function(channel) {
        Channel.remove({channelId: channel._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('channel');
      });
    }])
  .controller('ChannelEditCtrl', ['$scope', '$stateParams', 'Channel', 'Modal', 'demoMode', 'channel',
    function ($scope, $stateParams, Channel, Modal, demoMode, channel) {
      $scope.channel = channel;
      $scope.demoMode = demoMode;

      $scope.updateChannel = function() {
        $scope.submitted = true;
        if ($scope.form.$valid) {
          Channel.update({channelId: $stateParams.channelId}, $scope.channel).$promise.then(function(data) {
            Modal.success('<p>Update social channel successfully.</p>');
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
