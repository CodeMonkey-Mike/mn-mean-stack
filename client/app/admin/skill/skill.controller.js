'use strict';

angular.module('mnMeanApp')
  .controller('SkillCtrl', ['$scope', 'socket', 'Skill', 'Modal', 'demoMode',
    function ($scope, socket, Skill, Modal, demoMode) {

      $scope.skills = [];
      $scope.demoMode = demoMode;

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

      $scope.sortableOptions = {
        helper: function (e, ui) {
          ui.children().each(function() {
            $(this).width($(this).width());
          });
          return ui;
        },
        stop: function(e, ui) {
          // this callback has the changed model
          $scope.skills.forEach(function(skill, index) {
            skill.sequence = index;
            if (!$scope.demoMode) {
              Skill.update({skillId: skill._id}, skill);
            }
          });
        }
      };

      $scope.delete = Modal.confirm.delete(function(skill) {
        Skill.remove({skillId: skill._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('skill');
      });
  }])
  .controller('SkillEditCtrl', ['$scope', '$stateParams', 'Skill', 'Modal', 'demoMode', 'skill',
    function ($scope, $stateParams, Skill, Modal, demoMode, skill) {
      $scope.skill = skill;
      $scope.demoMode = demoMode;

      $scope.updateSkill = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Skill.update({skillId: $stateParams.skillId}, $scope.skill).$promise.then(function(data) {
          Modal.success('<p>The skill <strong>' + data.name + '</strong> has been successfully updated.</p>');
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
