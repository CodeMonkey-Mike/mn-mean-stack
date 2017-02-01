'use strict';

angular.module('mnMeanApp')
  .controller('PortfolioCtrl', ['$scope', 'socket', 'Portfolio', 'Modal',
    function ($scope, socket, Portfolio, Modal) {

      $scope.types = ['brands', 'services', 'tools'];
      $scope.portfolios = [];

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

      $scope.delete = Modal.confirm.delete(function(portfolio) {
        Portfolio.remove({portfolioId: portfolio._id}).$promise.catch(function(err) {
          Modal.alert(err.data.message);
        });
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('portfolio');
      });
    }]);
