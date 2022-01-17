import {socialiteNetworks} from '../../data';
import type {SocialiteNetwork} from '../../types';

export const allSocialiteNetworks = Object.values(socialiteNetworks);

export const mockCustomNetworks: SocialiteNetwork[] = [
  {
    id: 'foo',
    preferredUrl: 'https://foo.com',
    matcher: {
      domain: /foo/,
    },
  },
  {
    id: 'bar',
    preferredUrl: 'www.bar.com',
    matcher: {
      domain: /(bar|baz)/,
    },
  },
];
