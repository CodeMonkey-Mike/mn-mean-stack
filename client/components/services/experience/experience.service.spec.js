'use strict';

describe('Service: experience', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var experience;
  beforeEach(inject(function (_experience_) {
    experience = _experience_;
  }));

  it('should do something', function () {
    expect(!!experience).toBe(true);
  });

});
