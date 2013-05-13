describe('FullContact', function () {
  'use strict';

  var FullContact = require('../')
    , chai = require('chai')
    , expect = chai.expect;

  //
  // The API key we use for testing.
  //
  var key = process.env.API_KEY;

  it('exposes the Person constructor', function () {
    expect(FullContact.Person).to.be.a('function');
  });
});
