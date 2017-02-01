'use strict';

describe('Service: education', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var education;
  beforeEach(inject(function (_education_) {
    education = _education_;
  }));

  it('should do something', function () {
    expect(!!education).toBe(true);
  });

});
