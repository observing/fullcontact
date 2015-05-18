# fullcontact

`fullcontact` is a Node.js module that wraps the [fullcontact] API. It
implements the following API endpoints:

- [Location](#location)
- [Person](#person)
- [Email](#email)
- [Name](#name)

## Build status

[![Build Status](https://travis-ci.org/observing/fullcontact.png?branch=master)](https://travis-ci.org/observing/fullcontact)

## Installation

The module is distributed through npm (node package manager) and can be
installed using:

```
npm install fullcontact --save
```

The `--save` automatically adds the module to your `package.json` definition.

## Usage

We are all hackers in our heart that's why this module is build with
extensibility and hackibility in mind, there aren't any hidden components and all
the API endpoints are implemented as separate constructors so they can be
improved and hacked when needed.

You requirement the module as any other node.js module:

```js
'use strict';

var FullContact = require('fullcontact');

//
// The constructors are directly exposed on the FullContact constructor:
//
FullContact.Location;
FullContact.Person;
FullContact.Email;
FullContact.Name;
```

To create a new client you simply need to construct the module with your
FullContact API key:

```js
var fullcontact = new FullContact(api);
```

Alternatively you can also use the provided `createClient` method, is that's how
you roll.

```js
var fullcontact = FullContact.createClient(apikey);

//
// Or just call it directly:
//
var fullcontact = require('fullcontact').createClient(apikey);
```

The initialized FullContact client will have some properties that you might find
useful:

- `remaining` The amount of API calls you have remaining
- `ratelimit` The amount of API calls you're allowed to do
- `ratereset` When your rate limit will be reset again in EPOCH

Please note that these properties are all set to 0 until you have made your
first request to the API server as these values are parsed from the response
headers.

## Error responses

This API implemention will return an Error object when the FullContact response
is returned without a `status: 200` so it could be that your operation is queued
for processing. That's why all returned error's have a `status` property which
the returned status code (unless it's a parse error or a generic error). So just
because you got an error, it doesn't mean that your request has failed.

### Location

Turn your semi-structured data in fully structured location data. This
`Location` endpoint is namespaced as a `.location` property. It has 2 optional
arguments.

1. `casing` How is the provided location cased?
  - `uppercase` for UPPERCASED NAMES  (JOHN SMITH)
  - `lowercase` for lowercased names  (john smith)
  - `titlecase` for Title Cased names (John Smith)
2. `includeZeroPopulation` will display 0 population census locations. The
   provided value should be a boolean.

#### fullcontact.location.normalize('denver', [casing], [includeZeroPopulation], fn);

Normalize the location data.

```js
fullcontact.location.normalize('denver', function (err, data) {
  ..
});
```

#### fullcontact.location.enrich('denver', [casing], [includeZeroPopulation], fn);

Retrieve more information from the location API.

```js
fullcontact.location.enrich('denver', function (err, data) {
  ..
});
```

### Person

The `Person` endpoint is confidently namespaced as a `.person` property. 
Each person API has an optional `queue` argument which you can use to indicate that
this request will should be pre-processed by FullContact and that you want to
fetch the details later. According to the API it should to receive the value `1`
as queue.

The following methods are available on this API:

#### person.email(address, [queue], [webhookUrl], [webhookId], fn);

Retrieves contact information by e-mail address.
Supports the use of webhooks by providing an url and id.

```js
fullcontact.person.email('foo@bar.com', function (err, data) {
  ..
});
```

```js
fullcontact.person.email('foo@bar.com', null, 'https://mycallbackurl.com', 'webhooktracker', function (err, data) {
..
});
```

#### person.md5(address, [queue], fn);

Retrieves contact information by e-mail address but transforms the email to an
MD5 first.

```js
fullcontact.person.md5('foo@bar.com', function (err, data) {
  ..
});
```

#### person.twitter(handle, [queue], fn);

Retrieves contact information by Twitter username.

```js
fullcontact.person.twitter('3rdEden', function (err, data) {
  ..
});
```

#### person.facebook(handle, [queue], fn);

Retrieves contact information by Facebook username.

```js
fullcontact.person.facebook('john.smith', function (err, data) {
  ..
});
```

#### person.phone(handle, [queue], fn);

Retrieves contact information by phone number.

```js
fullcontact.person.phone('+13037170414', function (err, data) {
  ..
});
```

### Email

Reduce the number of anonymous subscribers by detecing of the user is
subscribing with a real e-mail address or just a one time address The `Email`
endpoint is namespaced under the `.email` property.

#### email.disposable(email, fn);

Checks if the given e-mail address was disposible.

```js
fullcontact.email.disposable('foo@bar.bar', function (err, data) {
  ..
});
```

### Name

The name API has an optional `casing` argument. The value of this optional
argument can either be:

- `uppercase` for UPPERCASED NAMES  (JOHN SMITH)
- `lowercase` for lowercased names  (john smith)
- `titlecase` for Title Cased names (John Smith)

#### fullcontact.name.normalize('John Smith', [casing], fn);

Normalize a name.

```js
fullcontact.name.normalize('John Smith', function (err, data) {
  ..
});
```

#### fullcontact.name.deducer({ email: 'opensource@observe.it' }, [casing], fn);

Name deducing. Unlinke other API's this API should receive an object with either
an `email` or `username` property which you want to use to substract the
information.

```js
fullcontact.name.deducer({ email: 'opensource@observe.it' }, function (err, data) {
  ..
});

fullcontact.name.deducer({ username: '3rdeden' }, 'lowercase', function (err, data) {
  ..
});
```

#### fullcontact.name.similarity('john', 'johnny', [casing], fn);

Check the similairity of between two names.

```js
fullcontact.name.similarity('john', 'johnny', function (err, data) {
 ..
});
```

#### fullcontact.name.stats({ name: 'john' }, [casing], fn);

Retrieve some statistics about the name. Just like the name `deducer` API this
API only accepts an object that receives either a `givenName`, `familyName` or
both.

```js
fullcontact.name.stats({ name: 'john' }, function (err, data) {
  ..
});

//
// fullcontact.name.stats({ givenName: 'john' }, [casing], fn);
// fullcontact.name.stats({ familyName: 'smith' }, [casing], fn);
// fullcontact.name.stats({ givenName: 'john', familyName: 'smith' }, [casing], fn);
//
```

#### fullcontact.name.parser('john smith', [casing], fn);

Parses the name to determin the likelyhoot that this is really a name.

```js
fullcontact.name.parser('john smith', function (err, data) {
  ..
});
```

## Testing

The tests are written against the live FullContact API. They can be ran using:

```
API_KEY=<key> npm test
```

Don't worry if you forget it, we'll throw an error and let you know ;-).

## License

The module is released under the MIT license.

[fullcontact]: https://fullcontact.com?withlovefrom=observer
