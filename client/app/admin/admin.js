'use strict';

angular.module('mnMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin:profile', {
        url: '/admin/profile',
        templateUrl: 'app/admin/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('admin:skill', {
        url: '/admin/skill',
        templateUrl: 'app/admin/skill/skill.html',
        controller: 'SkillCtrl'
      })
      .state('admin:education', {
        url: '/admin/education',
        templateUrl: 'app/admin/education/education.html',
        controller: 'EducationCtrl'
      })
      .state('admin:process', {
        url: '/admin/process',
        templateUrl: 'app/admin/process/process.html',
        controller: 'ProcessCtrl'
      })
      .state('admin:experience', {
        url: '/admin/experience',
        templateUrl: 'app/admin/experience/experience.html',
        controller: 'ExperienceCtrl'
      })
      .state('admin:service', {
        url: '/admin/service',
        templateUrl: 'app/admin/service/service.html',
        controller: 'ServiceCtrl'
      })
      .state('admin:testimonial', {
        url: '/admin/testimonial',
        templateUrl: 'app/admin/testimonial/testimonial.html',
        controller: 'TestimonialCtrl'
      })
      .state('admin:award', {
        url: '/admin/award',
        templateUrl: 'app/admin/award/award.html',
        controller: 'AwardCtrl'
      })
      .state('admin:portfolio', {
        url: '/admin/portfolio',
        templateUrl: 'app/admin/portfolio/portfolio.html',
        controller: 'PortfolioCtrl'
      })
  });
