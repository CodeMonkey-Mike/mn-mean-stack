'use strict';

angular.module('mnMeanApp')
  .controller('SkillCtrl', ['$scope', 'socket', 'Skill', 'Modal', function ($scope, socket, Skill, Modal) {

    $scope.skills = [];

    Skill.query(function(skills) {
      $scope.skills = skills;
      socket.syncUpdates('skill', $scope.skills);
    });

    $scope.addSkill = function() {
      if($scope.newSkill === {}) {
        return;
      }
      Skill.save({}, $scope.newSkill).$promise.then(function(data) {
        Modal.success('<p>Add skill successfully</p>').then(function() {
          // reset form
          $scope.newSkill = {};
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

    $scope.delete = Modal.confirm.delete(function(skill) {
      Skill.remove({skillId: skill._id}).$promise.catch(function(err) {
        Modal.alert(err.data.message);
      });
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('skill');
    });
  }]);
