'use strict';

describe('Directive: jssorSlider', function () {

  // load the directive's module
  beforeEach(module('mnMeanApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jssor-slider></jssor-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the jssorSlider directive');
  }));
});