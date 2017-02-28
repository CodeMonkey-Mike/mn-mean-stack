'use strict';

angular.module('mnMeanApp')
  .controller('PortfolioCtrl', ['$scope', 'socket', 'Portfolio', 'Modal', 'demoMode',
    function ($scope, socket, Portfolio, Modal, demoMode) {

      $scope.types = ['brands', 'social platforms', 'tools/services'];
      $scope.portfolios = [];
      $scope.demoMode = demoMode;

      Portfolio.query(function(portfolios) {
        $scope.portfolios = portfolios;
        socket.syncUpdates('portfolio', $scope.portfolios);
      });

      $scope.addPortfolio = function() {
        if($scope.newPortfolio === {}) {
          return;
        }
        Portfolio.save({}, $scope.newPortfolio).$promise.then(function(data) {
          Modal.success('<p>Add portfolio successfully</p>').then(function() {
            // reset form
            $scope.newPortfolio = {};
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
          $scope.portfolios.forEach(function(portfolio, index) {
            portfolio.sequence = index;
            if (!$scope.demoMode) {
              Portfolio.update({portfolioId: portfolio._id}, portfolio);
            }
          });
        }
      };

      $scope.delete = Modal.confirm.delete(function(portfolio) {
        Portfolio.remove({portfolioId: portfolio._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('portfolio');
      });
    }])
  .controller('PortfolioEditCtrl', ['$scope', '$stateParams', 'Portfolio', 'Modal', 'demoMode', 'portfolio',
    function ($scope, $stateParams, Portfolio, Modal, demoMode, portfolio) {
      $scope.portfolio = portfolio;
      $scope.types = ['brands', 'social platforms', 'tools/services'];
      $scope.demoMode = demoMode;

      $scope.updatePortfolio = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        Portfolio.update({portfolioId: $stateParams.portfolioId}, $scope.portfolio).$promise.then(function(data) {
          Modal.success('<p>The portfolio <strong>' + data.name + '</strong> has been successfully updated.</p>');
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
