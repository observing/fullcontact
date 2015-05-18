'use strict';

/**
 * Access the Company API.
 *
 * @constructor
 * @param {FullContact} api Reference to the FullContact wrapping instance.
 * @api public
 */
function Company(api) {
  this.api = api;

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/company/lookup.json';
  this.send = api.process.bind(api, this);
}

/**
 * Retrieve company information by domain
 *
 * ```js
 * fullcontact.company.domain('apple.com', [webhookUrl], [webhookId], fn);
 * ```
 *
 * @returns {Company}
 * @api public
 */
Company.prototype.domain = function domain() {
  var args = this.api.args(arguments, 'webhookUrl', 'webhookId');

  this.send({ domain: args.value }, args);
  return this;
};

module.exports = Company;
