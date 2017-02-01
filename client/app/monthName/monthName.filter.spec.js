'use strict';

describe('Filter: monthName', function () {

  // load the filter's module
  beforeEach(module('mnMeanApp'));

  // initialize a new instance of the filter before each test
  var monthName;
  beforeEach(inject(function ($filter) {
    monthName = $filter('monthName');
  }));

  it('should return the input prefixed with "monthName filter:"', function () {
    var text = 'angularjs';
    expect(monthName(text)).toBe('monthName filter: ' + text);
  });

});
