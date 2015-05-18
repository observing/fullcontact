describe('FullContact.Person', function () {
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

  describe('#email', function () {
    it('retrieves data by e-mail', function (done) {
      api.person.email('arnout@observe.it', done);
    });

    it('provides the proper casing');
  });

  describe('#email with webhook url/id', function () {
    it('retrieves data by e-mail and sets up a webhook with the right url and id', function (done) {
      api.person.email('arnout@observe.it', null, 'http://requestb.in/1bxgb751', 'webhookTest', done);
    });

    it('provides the proper casing');
  });

  describe('#md5', function () {
    var md5 = require('crypto').createHash('md5')
    .update('arnout@observe.it')
    .digest('hex')
    .toString();

    it('retrieves data by md5 e-mail', function (done) {
      api.person.md5(md5, done);
    });

    it('provides the proper casing');
  });

  describe('#twitter', function () {
    it('retrieves data by twitter handle', function (done) {
      api.person.twitter('observe_it', done);
    });

    it('provides the proper casing');
  });

  describe('#facebook', function () {
    it('retrieves data by facebook username', function (done) {
      api.person.facebook('arnout.kazemier', done);
    });

    it('provides the proper casing');
  });

  describe('#facebookId', function () {
    it('retrieves data by facebook id', function (done) {
      api.person.facebookId('1844599060', done);
    });

    it('provides the proper casing');
  });

  describe('#phone', function () {
    it('retrieves data by phone number', function (done) {
      api.person.phone('+13037170414', done);
    });

    it('provides the proper casing');
  });
});
