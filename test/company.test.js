describe('FullContact.Company', function () {
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

  describe('#domain', function () {
    it('retrieves data by domain', function (done) {
      api.company.domain('apple.com', done);
    });

    it('provides the proper casing');
  });

  describe('#domain with webhook url/id', function () {
    it('retrieves data by e-mail and sets up a webhook with the right url and id', function (done) {
      api.company.domain('apple.com', 'http://requestb.in/1bxgb751', 'webhookTest', done);
    });

    it('provides the proper casing');
  });
});
