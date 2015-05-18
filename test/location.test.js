describe('FullContact.Location', function () {
  'use strict';

  var FullContact = require('../');
  var chai = require('chai');

  chai.config.includeStack = true;

  //
  // The API key we use for testing.
  //
  var key = process.env.API_KEY;
  if (!key) {
    throw new Error('Please provide your API using the API_KEY env variable.');
  }

  //
  // Some of the requests take a really long time, so set a really long timeout
  //
  this.timeout(20000);

  //
  // Pre-create an API instance
  //
  var api = new FullContact(key);

  describe('#normalize', function () {
    it('it normalizes the given name', function (done) {
      api.location.normalize('denver', done);
    });

    it('provides the proper casing');
    it('includes zero population');
  });

  describe('#enrich', function () {
    it('provides location enrichment', function (done) {
      api.location.enrich('denver', done);
    });

    it('provides the proper casing');
    it('includes zero population');
  });
});
