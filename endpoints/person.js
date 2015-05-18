'use strict';

/**
 * Retrieve personal / contact information.
 *
 * @constructor
 * @param {FullContact} api
 * @api private
 */
function Person(api) {
  this.api = api;

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/person.json';
  this.send = api.process.bind(api, this);
}

/**
 * Retrieve contact information by e-mail.
 *
 * ```js
 * fullcontact.person.email('opensource@observe.it', [queue], [webhookUrl], [webhookId], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.email = function email() {
  var args = this.api.args(arguments, 'queue', 'webhookUrl', 'webhookId');

  this.send({ email: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by e-mail which is transformed to an MD5.
 *
 * ```js
 * fullcontact.person.md5('opensource@observe.it', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.md5 = function md5() {
  var args = this.api.args(arguments, 'queue');

  this.send({ emailMD5: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by Twitter handle.
 *
 * ```js
 * fullcontact.person.twitter('@3rdEden', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.twitter = function twitter() {
  var args = this.api.args(arguments, 'queue');

  this.send({ twitter: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by Facebook username.
 *
 * ```js
 * fullcontact.person.facebook('arnout.kazemier', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.facebook = function facebook() {
  var args = this.api.args(arguments, 'queue');

  this.send({ facebookUsername: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by Facebook id.
 *
 * ```js
 * fullcontact.person.facebookId('1844599060', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.facebookId = function facebook() {
  var args = this.api.args(arguments, 'queue');

  this.send({ facebookId: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by phone number.
 *
 * ```js
 * fullcontact.person.phone('98470947', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Person.prototype.phone = function phone() {
  var args = this.api.args(arguments, 'queue');

  this.send({ phone: args.value }, args);
  return this;
};

//
// Expose the Person endpoint.
//
module.exports = Person;
