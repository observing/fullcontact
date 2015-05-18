describe('FullContact', function () {
  'use strict';

  var FullContact = require('../');
  var chai = require('chai');
  var expect = chai.expect;

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

  it('exposes the createClient api which initializes the constructor', function () {
    var client = FullContact.createClient(key);

    expect(client).to.be.instanceOf(FullContact);
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

  it('throws an error when the API is constructed without a key', function () {
    try { new FullContact(); }
    catch(e) {
      return expect(e.message).to.equal('Missing API key');
    }

    throw new Error('I should have failed');
  });

  it('errors when an invalid API key is given', function (done) {
    var client = new FullContact(key + 'adfasfdsfadsfas');

    client.person.email('arnout@observe.it', function (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message.toLowerCase()).to.include('api');
      expect(err.message.toLowerCase()).to.include('key');

      done();
    });
  });

  it('sets the x-rate properties on request', function (done) {
    ['remaining', 'ratelimit', 'ratereset'].forEach(function (prop) {
      expect(api[prop]).to.equal(0);
    });

    api.person.email('arnout@observe.it', function email(err) {
      if (err) {
        return done(err);
      }

      ['remaining', 'ratelimit', 'ratereset'].forEach(function (prop) {
        expect(api[prop]).to.not.equal(0);
        expect(api[prop]).to.be.a('number');
      });

      done();
    });
  });

  it('decreases the rate remaining on request', function (done) {
    var remaining = api.remaining;

    api.person.email('arnout@observe.it', function email(err) {
      if (err) {
        return done(err);
      }

      //
      // The value should be same as before or below
      //
      expect(api.remaining).to.be.below(remaining + 1);
      done();
    });
  });

  it('does batch requests');
});
