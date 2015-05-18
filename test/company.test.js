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

describe('FullContact.Company', { timeout: 20000 }, function () {

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

  describe('#domain', function () {

    it('retrieves data by domain', function (done) {

      api.company.domain('apple.com', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('retrieves data by domain and sets up a webhook with the right url and id', function (done) {

      api.company.domain('apple.com', 'http://requestb.in/1bxgb751', 'webhookTest', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });
  });
});
