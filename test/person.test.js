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

describe('FullContact.Person', function () {

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

  describe('#email', function () {

    it('retrieves data by e-mail', function (done) {

      api.person.email('arnout@observe.it', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#email with webhook url/id', function () {

    it('retrieves data by e-mail and sets up a webhook with the right url and id', function (done) {

      api.person.email('arnout@observe.it', null, 'http://requestb.in/1bxgb751', 'webhookTest', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#md5', function () {

    var md5 = require('crypto').createHash('md5')
    .update('arnout@observe.it')
    .digest('hex')
    .toString();

    it('retrieves data by md5 e-mail', function (done) {

      api.person.md5(md5, function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#twitter', function () {

    it('retrieves data by twitter handle', function (done) {

      api.person.twitter('observe_it', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#facebook', function () {

    it('retrieves data by facebook username', function (done) {

      api.person.facebook('arnout.kazemier', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#facebookId', function () {

    it('retrieves data by facebook id', function (done) {

      api.person.facebookId('1844599060', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });

  describe('#phone', function () {

    it('retrieves data by phone number', function (done) {

      api.person.phone('+13037170414', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });
});
