'use strict';

describe('Service: EventSource', function () {

  // load the service's module
  beforeEach(module('kokpitApp'));

  // instantiate service
  var EventSource;
  beforeEach(inject(function(_EventSource_) {
    EventSource = _EventSource_;
  }));

  it('should do something', function () {
    expect(!!EventSource).toBe(true);
  });

});
