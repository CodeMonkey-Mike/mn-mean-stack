'use strict';

describe('Service: profile', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var Profile;
  beforeEach(inject(function (_Profile_) {
    Profile = _Profile_;
  }));

  it('should do something', function () {
    expect(!!Profile).toBe(true);
  });

});
