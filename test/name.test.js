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

describe('FullContact.Name', { timeout: 20000 }, function () {

  before(function (done) {
    //
    // The API key we use for testing.
    //
    var key = process.env.API_KEY;
    if (!key) {
      throw new Error('Please provide your API using the API_KEY env variable.');
    }

    api = new FullContact(key);
    return done();
  });

  describe('#normalize', function () {

    it('normalizes the name', function (done) {

      api.name.normalize('john Smith', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#deducer', function () {

    it('deduces email addresses', function (done) {

      api.name.deducer({ email: 'johndsmith870@corp.com' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('deduces usernames', function (done) {

      api.name.deducer({ username: 'johndsmith870' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#similarity', function () {

    it('checks the similarity of 2 given names', function (done) {

      api.name.similarity('john', 'johns', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#stats', function () {

    it('provides stats for a name', function (done) {

      api.name.stats({ name: 'john' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides stats for a given name', function (done) {

      api.name.stats({ givenName: 'john' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides stats for a family name', function (done) {

      api.name.stats({ familyName: 'smith' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides stats for a given and family name', function (done) {

      api.name.stats({ familyName: 'smith', givenName: 'john' }, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#parser', function () {

    it('parses the name', function (done) {

      api.name.parser('john smith', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });
});
