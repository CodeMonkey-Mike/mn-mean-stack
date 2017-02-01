'use strict';

describe('Service: testimonial', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var testimonial;
  beforeEach(inject(function (_testimonial_) {
    testimonial = _testimonial_;
  }));

  it('should do something', function () {
    expect(!!testimonial).toBe(true);
  });

});
