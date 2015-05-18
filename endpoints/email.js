'use strict';

/**
 * Access the E-mail API.
 *
 * @constructor
 * @param {FullContact} api Reference to the FullContact wrapping instance.
 * @api public
 */
function Email(api) {
  this.api = api;

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/email/';
  this.send = api.process.bind(api, this);
}

/**
 * Check if we we're given a disposable e-mail address.
 *
 * ```js
 * fullcontact.email.disposable('foo@bar.bar', fn);
 * ```
 *
 * @returns {Email}
 * @api public
 */
Email.prototype.disposable = function disposable() {
  var args = this.api.args(arguments);

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'disposable.json';

  this.send({ email: args.value }, args);
  return this;
};

module.exports = Email;
