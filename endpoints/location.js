'use strict';

/**
 * Access the location API.
 *
 * @constructor
 * @param {FullContact} api Reference to the FullContact wrapping instance.
 * @api private
 */
function Location(api) {
  this.api = api;

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/address/';
  this.send = api.process.bind(api, this);
}

/**
 * Normalize the location data.
 *
 * ```js
 * fullcontact.location.normalize('denver', [casing], [includeZeroPopulation], fn);
 * ```
 *
 * @returns {Location}
 * @api public
 */
Location.prototype.normalize = function normalize() {
  var args = this.api.args(arguments, 'casing', 'population');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'locationNormalizer.json';

  this.send({ place: args.value }, args);
  return this;
};

/**
 * Retrieve more information from the location API.
 *
 * ```js
 * fullcontact.location.enrich('denver', [casing], [includeZeroPopulation], fn);
 * ```
 *
 * @returns {Location}
 * @api public
 */
Location.prototype.enrich = function enrichment() {
  var args = this.api.args(arguments, 'casing', 'population');

  //
  // Add a custom endpoint.
  //
  args.endpoint = this.endpoint + 'locationEnrichment.json';

  this.send({ place: args.value }, args);
  return this;
};

//
// Expose the Location endpoint.
//
module.exports = Location;
