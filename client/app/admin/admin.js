'use strict';

angular.module('mnMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin:profile', {
        url: '/admin',
        templateUrl: 'app/admin/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:login', {
        url: '/admin/login',
        templateUrl: 'app/admin/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('admin:password', {
        url: '/admin/change-password',
        templateUrl: 'app/admin/password/password.html',
        controller: 'PasswordCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:skill', {
        url: '/admin/skill',
        templateUrl: 'app/admin/skill/skill.html',
        controller: 'SkillCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:skill:add', {
        url: '/admin/skill/add',
        templateUrl: 'app/admin/skill/skill-add.html',
        controller: 'SkillCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:skill:edit', {
        url: '/admin/skill/{skillId}/edit',
        templateUrl: 'app/admin/skill/skill-edit.html',
        controller: 'SkillEditCtrl',
        authenticate: true,
        resolve: {
          skill: function(Skill, $stateParams) {
            return Skill.get({skillId: $stateParams.skillId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:channel', {
        url: '/admin/channel',
        templateUrl: 'app/admin/channel/channel.html',
        controller: 'ChannelCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:channel:add', {
        url: '/admin/channel/add',
        templateUrl: 'app/admin/channel/channel-add.html',
        controller: 'ChannelCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:channel:edit', {
        url: '/admin/channel/{channelId}/edit',
        templateUrl: 'app/admin/channel/channel-edit.html',
        controller: 'ChannelEditCtrl',
        authenticate: true,
        resolve: {
          channel: function(Channel, $stateParams) {
            return Channel.get({channelId: $stateParams.channelId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:education', {
        url: '/admin/education',
        templateUrl: 'app/admin/education/education.html',
        controller: 'EducationCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:education:add', {
        url: '/admin/education/add',
        templateUrl: 'app/admin/education/education-add.html',
        controller: 'EducationCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:education:edit', {
        url: '/admin/education/{educationId}/edit',
        templateUrl: 'app/admin/education/education-edit.html',
        controller: 'EducationEditCtrl',
        authenticate: true,
        resolve: {
          education: function(Education, $stateParams) {
            return Education.get({educationId: $stateParams.educationId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:process', {
        url: '/admin/process',
        templateUrl: 'app/admin/process/process.html',
        controller: 'ProcessCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:process:add', {
        url: '/admin/process/add',
        templateUrl: 'app/admin/process/process-add.html',
        controller: 'ProcessCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:process:edit', {
        url: '/admin/process/{processId}/edit',
        templateUrl: 'app/admin/process/process-edit.html',
        controller: 'ProcessEditCtrl',
        authenticate: true,
        resolve: {
          process: function(Process, $stateParams) {
            return Process.get({processId: $stateParams.processId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:experience', {
        url: '/admin/experience',
        templateUrl: 'app/admin/experience/experience.html',
        controller: 'ExperienceCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:experience:add', {
        url: '/admin/experience/add',
        templateUrl: 'app/admin/experience/experience-add.html',
        controller: 'ExperienceCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:experience:edit', {
        url: '/admin/experience/{experienceId}/edit',
        templateUrl: 'app/admin/experience/experience-edit.html',
        controller: 'ExperienceEditCtrl',
        authenticate: true,
        resolve: {
          experience: function(Experience, $stateParams) {
            return Experience.get({experienceId: $stateParams.experienceId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:service', {
        url: '/admin/service',
        templateUrl: 'app/admin/service/service.html',
        controller: 'ServiceCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:service:add', {
        url: '/admin/service/add',
        templateUrl: 'app/admin/service/service-add.html',
        controller: 'ServiceCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:service:edit', {
        url: '/admin/service/{serviceId}/edit',
        templateUrl: 'app/admin/service/service-edit.html',
        controller: 'ServiceEditCtrl',
        authenticate: true,
        resolve: {
          service: function(Service, $stateParams) {
            return Service.get({serviceId: $stateParams.serviceId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:testimonial', {
        url: '/admin/testimonial',
        templateUrl: 'app/admin/testimonial/testimonial.html',
        controller: 'TestimonialCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:testimonial:add', {
        url: '/admin/testimonial/add',
        templateUrl: 'app/admin/testimonial/testimonial-add.html',
        controller: 'TestimonialCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:testimonial:edit', {
        url: '/admin/testimonial/{testimonialId}/edit',
        templateUrl: 'app/admin/testimonial/testimonial-edit.html',
        controller: 'TestimonialEditCtrl',
        authenticate: true,
        resolve: {
          testimonial: function(Testimonial, $stateParams) {
            return Testimonial.get({testimonialId: $stateParams.testimonialId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:award', {
        url: '/admin/award',
        templateUrl: 'app/admin/award/award.html',
        controller: 'AwardCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:award:add', {
        url: '/admin/award/add',
        templateUrl: 'app/admin/award/award-add.html',
        controller: 'AwardCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:award:edit', {
        url: '/admin/award/{awardId}/edit',
        templateUrl: 'app/admin/award/award-edit.html',
        controller: 'AwardEditCtrl',
        authenticate: true,
        resolve: {
          award: function(Award, $stateParams) {
            return Award.get({awardId: $stateParams.awardId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:portfolio', {
        url: '/admin/portfolio',
        templateUrl: 'app/admin/portfolio/portfolio.html',
        controller: 'PortfolioCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:portfolio:add', {
        url: '/admin/portfolio/add',
        templateUrl: 'app/admin/portfolio/portfolio-add.html',
        controller: 'PortfolioCtrl',
        authenticate: true,
        resolve: {
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
      .state('admin:portfolio:edit', {
        url: '/admin/portfolio/{portfolioId}/edit',
        templateUrl: 'app/admin/portfolio/portfolio-edit.html',
        controller: 'PortfolioEditCtrl',
        authenticate: true,
        resolve: {
          portfolio: function(Portfolio, $stateParams) {
            return Portfolio.get({portfolioId: $stateParams.portfolioId}).$promise;
          },
          demoMode: function(Auth) {
            return Auth.isDemoAdmin();
          }
        }
      })
  });
