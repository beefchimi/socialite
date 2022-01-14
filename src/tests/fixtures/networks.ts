import type {SocialNetwork} from '../../types';

export const mockCustomNetworks: SocialNetwork[] = [
  {
    id: 'foo',
    title: 'Foo inc',
    preferredUrl: 'https://foo.com',
    matcher: {
      domain: 'foo',
    },
  },
  {
    id: 'bar',
    title: 'Bar ltd',
    preferredUrl: 'www.bar.com',
    matcher: {
      domain: '(bar|baz)',
    },
  },
];
