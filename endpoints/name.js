'use strict';

/**
 * Access the name API.
 *
 * @constructor
 * @param {FullContact} api Reference to the FullContact wrapping instance.
 * @api public
 */
function Name(api) {
  this.api = api;

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/name/';
  this.send = api.process.bind(api, this);
}

/**
 * Normalize a name.
 *
 * ```js
 * fullcontact.name.normalize('John Smith', [casing], fn);
 * ```
 *
 * @returns {Name}
 * @api public
 */
Name.prototype.normalize = function normalize() {
  var args = this.api.args(arguments, 'casing');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'normalizer.json';

  this.send({ q: args.value }, args);
  return this;
};

/**
 * Name deducing.
 *
 * ```js
 * fullcontact.name.deducer({ email: 'opensource@observe.it' }, [casing], fn);
 * fullcontact.name.deducer({ username: '3rdEden' }, [casing], fn);
 * ```
 *
 * @returns {Name}
 * @api public
 */
Name.prototype.deducer = function deducer() {
  var args = this.api.args(arguments, 'casing');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'deducer.json';

  this.send(args.value, args);
  return this;
};

/**
 * Check the similairity of between two names.
 *
 * ```js
 * fullcontact.name.similarity('john', 'johnny', [casing], fn);
 * ```
 *
 * @returns {Name}
 * @api public
 */
Name.prototype.similarity = function similarity() {
  var args = this.api.args(arguments, 'q2', 'casing');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'similarity.json';

  this.send({ q1: args.value, q2: args.q2 }, args);
  return this;
};

/**
 * Retrieve some statistics about the name.
 *
 * ```js
 * fullcontact.name.stats({ name: 'john' }, [casing], fn);
 * fullcontact.name.stats({ givenName: 'john' }, [casing], fn);
 * fullcontact.name.stats({ familyName: 'smith' }, [casing], fn);
 * fullcontact.name.stats({ givenName: 'john', familyName: 'smith' }, [casing], fn);
 * ```
 *
 * @returns {Name}
 * @api public
 */
Name.prototype.stats = function stats() {
  var args = this.api.args(arguments, 'casing');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'stats.json';

  this.send(args.value, args);
  return this;
};

/**
 * Parses the name to determin the likelyhoot that this is really a name.
 *
 * ```js
 * fullcontact.name.parser('john smith', [casing], fn);
 * ```
 *
 * @returns {Name}
 * @api public
 */
Name.prototype.parser = function parser() {
  var args = this.api.args(arguments, 'casing');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'parser.json';

  this.send({ q: args.value }, args);
  return this;
};

//
// Expose the Name endpoint.
//
module.exports = Name;
