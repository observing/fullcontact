'use strict';

var Lab = require('lab');
var Code = require('code');
var FullContact = require('../');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var expect = Code.expect;

var api = null;
var key = null;

describe('FullContact', function () {

  before(function (done) {
    //
    // The API key we use for testing.
    //
    key = process.env.API_KEY;
    if (!key) {
      throw new Error('Please provide your API using the API_KEY env variable.');
    }

    api = new FullContact(key);
    return done();
  });

  it('exposes the createClient api which initializes the constructor', function (done) {
    var client = FullContact.createClient(key);

    expect(client).to.be.instanceOf(FullContact);
    done();
  });

  it('exposes the Person constructor', function (done) {

    expect(FullContact.Person).to.be.a.function();
    done();
  });

  it('exposes the Location constructor', function (done) {

    expect(FullContact.Location).to.be.a.function();
    done();
  });

  it('exposes the Email constructor', function (done) {

    expect(FullContact.Email).to.be.a.function();
    done();
  });

  it('exposes the Name constructor', function (done) {

    expect(FullContact.Name).to.be.a.function();
    done();
  });

  it('throws an error when the API is constructed without a key', function (done) {
    try { new FullContact(); }
    catch(e) {
      expect(e.message).to.equal('Missing API key');
      return done();
    }

    return done('I should have failed');
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
        expect(api[prop]).to.be.a.number();
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
