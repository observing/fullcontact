describe('FullContact', function () {
  'use strict';

  var FullContact = require('../')
    , chai = require('chai')
    , expect = chai.expect;

  //
  // The API key we use for testing.
  //
  var key = process.env.API_KEY;

  //
  // Some of the requests take a really long time, so set a really long timeout
  //
  this.timeout(20000);

  it('exposes the createClient api which initializes the constructor', function () {
    var api = FullContact.createClient(key);

    expect(api).to.be.instanceOf(FullContact);
  });

  it('exposes the Person constructor', function () {
    expect(FullContact.Person).to.be.a('function');
  });

  it('exposes the Location constructor', function () {
    expect(FullContact.Location).to.be.a('function');
  });

  it('exposes the Email constructor', function () {
    expect(FullContact.Email).to.be.a('function');
  });

  it('exposes the Name constructor', function () {
    expect(FullContact.Name).to.be.a('function');
  });

  it('sets the x-rate properties on request', function (done) {
    var fc = new FullContact(key);

    ['remaining', 'ratelimit', 'ratereset'].forEach(function (prop) {
      expect(fc[prop]).to.equal(0);
    });

    fc.person.email('arnout@observe.it', function normalize(err, data) {
      if (err) return done(err);

      ['remaining', 'ratelimit', 'ratereset'].forEach(function (prop) {
        expect(fc[prop]).to.not.equal(0);
        expect(fc[prop]).to.be.a('number');
      });

      done();
    });
  });

  it('decreases the rate remaining on request');
  it('errors when an invalid API key is given');

  it('does batch requests');
});
