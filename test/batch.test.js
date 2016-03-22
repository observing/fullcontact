describe('FullContact.Batch', function () {
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
  // Create a multi API instance
  //
  var multi = new FullContact(key).multi();

  describe('#multi', function () {
    it('batches two requests', function (done) {
      multi.person.twitter('observe_it');
      multi.person.twitter('jack');
      
      multi.exec(done);
    });

    it('provides the proper casing');
  });
});
