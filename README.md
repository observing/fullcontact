# fullcontact

`fullcontact` is a Node.js module that wraps the [fullcontact] API. It
implements the following API endpoints:

- Location
- Person
- Email
- Name

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

### Person

The `Person` endpoint is confidently namespaced as a `.person` property. Each
person API has an optional `queue` argument which you can use to indicate that
this request will should be pre-processed by FullContact and that you want to
fetch the details later. According to the API it should to receive the value `1`
as queue.

The following methods are available on this API:

### person.email(address, [queue], fn);

Retrieves contact information by e-mail address.

```js
fullcontact.person.email('foo@bar.com', function (err, data) {
  ..
});
```

### person.md5(address, [queue], fn);

Retrieves contact information by e-mail address but transforms the email to an
MD5 first.

```js
fullcontact.person.md5('foo@bar.com', function (err, data) {
  ..
});
```

### person.twitter(handle, [queue], fn);

Retrieves contact information by Twitter username.

```js
fullcontact.person.twitter('3rdEden', function (err, data) {
  ..
});
```

### person.facebook(handle, [queue], fn);

Retrieves contact information by Facebook username.

```js
fullcontact.person.facebook('john.smith', function (err, data) {
  ..
});
```

### person.phone(handle, [queue], fn);

Retrieves contact information by phone number.

```js
fullcontact.person.phone('+13037170414', function (err, data) {
  ..
});
```

## License

The module is released under the MIT license.

[fullcontact]: https://fullcontact.com?withlovefrom=observer
