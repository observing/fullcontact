describe('FullContact.Person', function () {
  'use strict';

  var FullContact = require('../')
    , chai = require('chai')
    , expect = chai.expect;

  chai.Assertion.includeStack = true;

  //
  // The API key we use for testing.
  //
  var key = process.env.API_KEY;

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

  describe('#phone', function () {
    it('retrieves data by phone number');

    it('provides the proper casing');
  });
});
