# Socialite

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

`Socialite` is a quick and easy way to parse a `url: string` to determine:

1. What social network it belongs to.
2. What the `user` handle is.
3. What the social `prefix` is _(if relevant)_.
4. What each url segment is, broken up into groups.

The minimum criteria for parsing a `url` is:

1. **`domain`**: _https:// www. **domain** .com /path_
2. **`tldomain`**: _https:// www. domain **.com** /path_

## Installation

Simply install via the command-line or include in your `package.json`, just like any other dependency.

```sh
# Alternatively install with `yarn` or `pnpm`
npm install socialitejs
```

## How to use

By default, `Socialite` includes only a small collection of the most common social networks. The exact networks included can be found in the `defaultSocialiteNetworks` array. A typical use case looks like:

```ts
import {Socialite} from 'socialitejs';

const socialiteInstance = new Socialite();
const mySocialUrl = 'https://www.twitter.com/@SomeFakeUserHandle';
const parsedSocialUrl = socialiteInstance.parseProfile(mySocialUrl);

console.log(parsedSocialUrl);
```

The above will log the following `SocialProfile` _(object)_ to the console:

```ts
{
  id: 'twitter',
  prefix: '@',
  user: 'SomeFakeUserHandle',
  originalUrl: 'https://www.twitter.com/@SomeFakeUserHandle',
  preferredUrl: 'https://twitter.com/@SomeFakeUserHandle',
  appUrl: 'https://mobile.twitter.com/@SomeFakeUserHandle',
  urlGroups: {
    scheme: 'https://',
    subdomain: 'www.',
    domain: 'twitter',
    tldomain: '.com',
    path: '/@SomeFakeUserHandle',
    // Other url parts are omitted if `undefined`
  },
}
```

For a more robust collection of social networks, you can import the `socialiteNetworks` object and use it _(at least)_ one of two ways:

```ts
import {Socialite, socialiteNetworks} from 'socialitejs';
import type {SocialiteId} from 'socialitejs';

// Adding all social networks in bulk:
const allNetworksInstance = new Socialite(Object.values(socialiteNetworks));

// Logs to the console all social networks included in the code base.
console.log(allNetworksInstance.getNetworks());

// Initializing `Socialite` without any networks (pass empty `array`):
const selectiveNetworksInstance = new Socialite([]);
const excludedNetworks: SocialiteId[] = ['discord', 'facebook', 'reddit'];

Object.keys(socialiteNetworks).forEach((network) => {
  if (!excludedNetworks.includes(network.id)) {
    selectiveNetworksInstance.addNetwork(network);
  }
});

// Logs to the console all social networks not found in `excludedNetworks`.
console.log(selectiveNetworksInstance.getNetworks());
```

## Features

...this section is incomplete... check back later for API documentation.
