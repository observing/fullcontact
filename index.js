'use strict';

var request = require('request')
, qs = require('qs');

var slice = Array.prototype.slice;

/**
 * Create new FullContact instance.
 *
 * @constructor
 * @param {String} api The API key for the Full Contact service.
 * @api public
 */
function FullContact(api) {
  if (!(this instanceof FullContact)) {
    return new FullContact(api);
  }

  this.key = api;         // API key
  this.version = 'v2';    // API version

  this.remaining = 0;     // How many API calls are remaining
  this.ratelimit = 0;     // The amount of API calls allowed
  this.ratereset = 0;     // In how many seconds is the rate limit reset

  this.queueing = false;  // Should we be queueing requests
  this.requests = [];     // Stores all queued commands

  if (!this.key) {
    throw new Error('Missing API key');
  }
}

/**
 * Process the requests before sending, queueing, or what evering
 *
 * @param {Mixed} api Reference to the Person/WhatEver API.
 * @param {Object} query Query string object that should be send.
 * @param {Object} args Arguments.
 * @api private
 */
FullContact.prototype.process = function req(api, query, args) {
  query.apiKey = query.apiKey || this.key;

  //
  // Add some addition properties
  //
  if (args.queue) {
    query.queue = args.queue;
  }
  if (args.casing) {
    query.casing = args.casing;
  }
  if (args.population) {
    query.includeZeroPopulation = !!args.population;
  }

  if (args.webhookUrl) {
    query.webhookUrl = args.webhookUrl;
  }
  if (args.webhookId) {
    query.webhookId = args.webhookId;
  }

  //
  // The packet that is send to the server or queued when we are in queuing
  // mode.
  //
  var packet = {
    method: 'GET',
    uri: args.endpoint || api.endpoint,
    qs: query
  };

  if (this.queueing) {
    return this.queue(packet, args);
  }

  return this.request(packet, args);
};

/**
 * Send a GET request to the FullContact servers using given packet.
 *
 * @param {Object} packet Request packet.
 * @param {Object} args API arguments.
 * @api private
 */
FullContact.prototype.request = function req(packet, args) {
  var fn = args.fn
  , self = this;

  request(packet, function requested(err, res, body) {
    if (err) {
      return fn(err);
    }

    self.ratereset = +res.headers['x-rate-limit-reset'] || self.ratereset;
    self.ratelimit = +res.headers['x-rate-limit-limit'] || self.ratelimit;
    self.remaining = +res.headers['x-rate-limit-remaining'] || self.remaining;

    //
    // Parse response to JSON.
    //
    if (typeof body === 'string') {
      try { body = JSON.parse(body); }
      catch (e) {
        return fn(new Error('Failed to parse API response (' + e.message + ')'));
      }
    }

    //
    // Handle API errors, FullContact adds a "status" key to the JSON response
    // it will have a "message" property when it's a failed request so we can
    // leverage that to return a nice error.
    //
    if (body.status !== 200 && body.status !== 202) {
      err = new Error(body.message);
      err.status = body.status;

      return fn(err);
    }

    fn(undefined, body);
  });

  return this;
};

/**
 * Start a multi/batch request to the API.
 *
 * @api public
 */
FullContact.prototype.multi = function multi() {
  var queued = new FullContact(this.key);

  //
  // Force queueing mode on the newly generated API
  //
  queued.queueing = true;

  return queued;
};

/**
 * Queue up requests so they can be send as a batch.
 *
 * @param {Object} packet The object that would be send using .request
 * @param {Object} args The arguments;
 * @api private
 */
FullContact.prototype.queue = function queue(packet, args) {
  this.requests.push({
    url: packet.uri + '?' + qs.stringify(packet.qs),
    fn: args.fn
  });

  return this;
};

/**
 * Send all the batched requests to the server.
 *
 * @param {Function} fn The callback.
 * @api public
 */
FullContact.prototype.exec = function exec(fn) {
  fn = fn || function noop() {};

  var requests = this.requests.splice(0);

  /**
   * Handle errors easily and ensure that all callbacks are called that were
   * queued in the process.
   *
   * @param {Error} err The exception that occured
   */
  function bailout(err) {
    requests.forEach(function cb(data) {
      if (data.fn) {
        data.fn(err);
      }
    });

    fn(err);
  }

  //
  // We are no longer queing requests.
  //
  this.queueing = false;

  request({
    method: 'POST',
    uri: 'https://api.fullcontact.com/' + this.version + '/batch.json',
    qs: { apiKey: this.key },
    json: {
      requests: requests.map(function urlsonly(data) {
        return data.url;
      })
    }
  }, function requested(err, res, body) {
    if (err) {
      return bailout(err);
    }

    fn(err, body.responses);
  });
};

/**
 * Parse the given arguments because we don't want to do an optional queue check
 * for every single API endpoint.
 *
 * @param {Arguments} args Arguments
 * @returns {Object}
 * @api private
 */
FullContact.prototype.args = function parser(args) {
  var optional = slice.call(arguments, 1);
  args = slice.call(args, 0);

  return optional.reduce(function optional(data, key, index) {
    data[key] = args[index];
    return data;
  }, { value: args.shift(), fn: args.pop() });
};

/**
 * Define an lazyload new API's.
 *
 * @param {Object} where Where should we define the property
 * @param {String} name The name of the property
 * @param {Function} fn The function that returns the new value
 * @api private
 */
FullContact.define = function define(where, name, fn) {
  Object.defineProperty(where, name, {
    configurable: true,
    get: function get() {
      return Object.defineProperty(this, name, {
        value: fn.call(this)
      })[name];
    },
    set: function set(value) {
      return Object.defineProperty(this, name, {
        value: value
      })[name];
    }
  });
};

/**
 * Have a Node API compatible client interface.
 *
 * @param {String} api The API key for full contact
 * @returns {FullContact}
 * @api public
 */
FullContact.createClient = function createClient(api) {
  return new FullContact(api);
};

//
// Expose the endpoints.
//
FullContact.Location = require('./endpoints/location');
FullContact.Person = require('./endpoints/person');
FullContact.Email = require('./endpoints/email');
FullContact.Name = require('./endpoints/name');
FullContact.Company = require('./endpoints/company');

//
// Lazy load the various of endpoints so they only get initialized when we
// actually need them.
//
FullContact.define(FullContact.prototype, 'location', function define() {
  return new FullContact.Location(this);
});

FullContact.define(FullContact.prototype, 'email', function define() {
  return new FullContact.Email(this);
});

FullContact.define(FullContact.prototype, 'person', function define() {
  return new FullContact.Person(this);
});

FullContact.define(FullContact.prototype, 'name', function define() {
  return new FullContact.Name(this);
});

FullContact.define(FullContact.prototype, 'company', function define() {
  return new FullContact.Company(this);
});

//
// Expose the FullContact API.
//
module.exports = FullContact;
