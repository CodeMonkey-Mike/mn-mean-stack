'use strict';

angular.module('mnMeanApp')
  .controller('MainCtrl', ['$scope', '$state', 'socket', 'Auth', "Contact", "Modal", "profile", "skills", "educations", "processes", "experiences", "services", "awards", "testimonials", "portfolios", "channels",
    function ($scope, $state, socket, Auth, Contact, Modal, profile, skills, educations, processes, experiences, services, awards, testimonials, portfolios, channels) {
      $scope.profile = profile;
      $scope.skills = skills;
      $scope.educations = educations;
      $scope.processes = processes;
      $scope.experiences = experiences;
      $scope.services = services;
      $scope.awards = awards;
      $scope.testimonials = testimonials;
      $scope.portfolios = portfolios;
      $scope.channels = channels;
      $scope.contact = {};

      socket.syncUpdates('skill', $scope.skills);
      socket.syncUpdates('education', $scope.educations);
      socket.syncUpdates('process', $scope.processes);
      socket.syncUpdates('experience', $scope.experiences);
      socket.syncUpdates('service', $scope.services);
      socket.syncUpdates('award', $scope.awards);
      socket.syncUpdates('testimonial', $scope.testimonials);
      socket.syncUpdates('portfolio', $scope.portfolios);
      socket.syncUpdates('channel', $scope.channels);

      $scope.jssorOptions = {
        $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
        $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
        $AutoPlayInterval: 15000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
        $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, default value is 1
        $ArrowKeyNavigation: true,                          //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
        $SlideDuration: 300,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
        $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
        $SlideSpacing: 3,                                   //[Optional] Space between each slide in pixels, default value is 0
        $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
        $ParkingPosition: 0,                              //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
        $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
        $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
        $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
        $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
          $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
          $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
          $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
          $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
          $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
          $SpacingX: 0,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
          $SpacingY: 0,                                   //[Optional] Vertical space between each item in pixel, default value is 0
          $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
        },
        $ArrowNavigatorOptions: {
          $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
          $ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
          $AutoCenter: 2,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
          $Steps: 4                                       //[Optional] Steps to go for each navigation request, default value is 1
        }
      };


      $scope.showDetail = function(portfolio) {
        $scope.selectedPortfolio = portfolio;
        angular.element('body').scrollTo('#filters',{duration:'slow', offsetTop : '50'});
      };

      $scope.closeDetail = function() {
        $scope.selectedPortfolio = null;
      };

      $scope.contactMe = function() {
        if ($scope.contact === {}) {
          return;
        }
        if ($scope.contactForm.$valid) {
          Contact.send($scope.contact).$promise.then(function (data) {
            Modal.success('<p>Your message has been sent successfully.</p>').then(function () {
              // reset form
              $scope.contact = {};
            });
          }).catch(function (err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              $scope.contactForm[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        }
      };

      $scope.logout = function() {
        Auth.logout();
        $state.go('main');
      };

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('skill');
        socket.unsyncUpdates('education');
        socket.unsyncUpdates('process');
        socket.unsyncUpdates('experience');
        socket.unsyncUpdates('service');
        socket.unsyncUpdates('award');
        socket.unsyncUpdates('testimonial');
        socket.unsyncUpdates('portfolio');
      });
    }]);
