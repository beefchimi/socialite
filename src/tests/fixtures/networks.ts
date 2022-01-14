import type {SocialNetwork} from '../../types';

export const mockCustomNetworks: SocialNetwork[] = [
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
