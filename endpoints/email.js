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

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/verification/';
  this.send = api.process.bind(api, this);
}

/**
 * Verifies the existance of an email address.
 *
 * ```js
 * fullcontact.email.verify('foo@bar.bar', fn);
 * ```
 *
 * @returns {Email}
 * @api public
 */
Email.prototype.verify = function verify() {
  var args = this.api.args(arguments);

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'email';

  this.send({ email: args.value }, args);
  return this;
};

module.exports = Email;
