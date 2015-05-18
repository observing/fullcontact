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

describe('FullContact.Email', { timeout: 20000 }, function () {

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

  describe('#disposable', function () {

    it('is it an disposable e-mail address', function (done) {

      api.email.disposable('arnout@observe.it', function (err, data) {

        expect(err).to.not.exist();
        expect(data).to.be.an.object();
        expect(data.status).to.be.within(200, 202);

        return done();
      });
    });

    it('provides the proper casing');
  });
});
