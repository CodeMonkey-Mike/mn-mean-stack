'use strict';

describe('Service: award', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var award;
  beforeEach(inject(function (_award_) {
    award = _award_;
  }));

  it('should do something', function () {
    expect(!!award).toBe(true);
  });

});
