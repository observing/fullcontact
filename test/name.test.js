describe('FullContact.Name', function () {
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
    it('normalizes the name', function (done) {
      api.name.normalize('john Smith', done);
    });

    it('provides the proper casing');
  });

  describe('#deducer', function () {
    it('deduces email addresses', function (done) {
      api.name.deducer({ email: 'johndsmith870@corp.com' }, done);
    });

    it('deduces usernames', function (done) {
      api.name.deducer({ username: 'johndsmith870' }, done);
    });

    it('provides the proper casing');
  });

  describe('#similarity', function () {
    it('checks the similarity of 2 given names', function (done) {
      api.name.similarity('john', 'johns', done);
    });

    it('provides the proper casing');
  });

  describe('#stats', function () {
    it('provides stats for a name', function (done) {
      api.name.stats({ name: 'john' }, done);
    });

    it('provides stats for a given name', function (done) {
      api.name.stats({ givenName: 'john' }, done);
    });

    it('provides stats for a family name', function (done) {
      api.name.stats({ familyName: 'smith' }, done);
    });

    it('provides stats for a given and family name', function (done) {
      api.name.stats({ familyName: 'smith', givenName: 'john' }, done);
    });

    it('provides the proper casing');
  });

  describe('#parser', function () {
    it('parses the name', function (done) {
      api.name.parser('john smith', done);
    });

    it('provides the proper casing');
  });
});
