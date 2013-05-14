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

  describe('#email', function () {
    it('retrieves data by e-mail');
    it('provides the proper casing');
  });

  describe('#md5', function () {
    it('retrieves data by md5 e-mail');
    it('provides the proper casing');
  });

  describe('#md5', function () {
    it('retrieves data by md5 e-mail');
    it('provides the proper casing');
  });

  describe('#twitter', function () {
    it('retrieves data by twitter handle');
    it('provides the proper casing');
  });

  describe('#facebook', function () {
    it('retrieves data by facebook username');
    it('provides the proper casing');
  });

  describe('#phone', function () {
    it('retrieves data by phone number');
    it('provides the proper casing');
  });
});
