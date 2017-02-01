'use strict';

describe('Service: skill', function () {

  // load the service's module
  beforeEach(module('mnMeanApp'));

  // instantiate service
  var Skill;
  beforeEach(inject(function (_Skill_) {
    Skill = _Skill_;
  }));

  it('should do something', function () {
    expect(!!Skill).toBe(true);
  });

});
