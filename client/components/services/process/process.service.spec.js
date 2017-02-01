'use strict';

describe('Service: process', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var Process;
  beforeEach(inject(function (_Process_) {
    Process = _Process_;
  }));

  it('should do something', function () {
    expect(!!Process).toBe(true);
  });

});
