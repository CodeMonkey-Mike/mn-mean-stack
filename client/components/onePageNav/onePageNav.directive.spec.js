'use strict';

describe('Directive: onePageNav', function () {

  // load the directive's module
  beforeEach(module('mnMeanApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<one-page-nav></one-page-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the onePageNav directive');
  }));
});