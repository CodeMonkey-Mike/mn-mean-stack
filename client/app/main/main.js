'use strict';

angular.module('mnMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          profile: function(Profile) {
            return Profile.get().$promise;
          },
          skills: function(Skill) {
            return Skill.query().$promise;
          },
          educations: function(Education) {
            return Education.query().$promise;
          },
          processes: function(Process) {
            return Process.query().$promise;
          },
          experiences: function(Experience) {
            return Experience.query().$promise;
          },
          services: function(Service) {
            return Service.query().$promise;
          },
          awards: function(Award) {
            return Award.query().$promise;
          },
          testimonials: function(Testimonial) {
            return Testimonial.query().$promise;
          },
          portfolios: function(Portfolio) {
            return Portfolio.query().$promise;
          },
          channels: function(Channel) {
            return Channel.query().$promise;
          }
        }
      });
  });
