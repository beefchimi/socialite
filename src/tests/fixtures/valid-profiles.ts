import {getUrlWithSubstitutions} from '../../helpers';
import {socialNetworkPrefixes} from '../../prefixes';
import {
  facebook as networkFacebook,
  twitter as networkTwitter,
} from '../../networks';
import type {
  BasicUrl,
  SocialProfile,
  SocialNetwork,
  UserName,
} from '../../types';

export const mockMinimalUser: UserName = '';
export const mockMinimalUrl: BasicUrl = `https://www.facebook.com/${mockMinimalUser}`;
export const mockMinimalProfile: SocialProfile = {
  id: networkFacebook.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'www.',
    domain: 'facebook',
    tldomain: '.com/',
  },
  originalUrl: mockMinimalUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkFacebook.preferredUrl,
    mockMinimalUser,
  ),
};

export const mockFacebookUser: UserName = 'Uz3r_N@me!';
export const mockFacebookUrl: BasicUrl = `https://www.facebook.com/${mockFacebookUser}/`;
export const mockFacebookProfile: SocialProfile = {
  id: networkFacebook.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'www.',
    domain: 'facebook',
    tldomain: '.com',
    path: `/${mockFacebookUser}/`,
  },
  originalUrl: mockFacebookUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkFacebook.preferredUrl,
    mockFacebookUser,
  ),
  user: mockFacebookUser,
};

export const mockTwitterPrefix = socialNetworkPrefixes.twitter;
export const mockTwitterUser: UserName = '123ABC=human0';
export const mockTwitterUrl: BasicUrl = `https://mobile.twitter.com/${mockTwitterPrefix}${mockTwitterUser}/`;
export const mockTwitterProfile: SocialProfile = {
  id: networkTwitter.id,
  urlGroups: {
    scheme: 'https://',
    // subdomain: 'mobile.',
    domain: 'mobile.twitter',
    tldomain: '.com',
    path: `/${mockTwitterPrefix}${mockTwitterUser}/`,
  },
  originalUrl: mockTwitterUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkTwitter.preferredUrl,
    mockTwitterUser,
    mockTwitterPrefix,
  ),
  appUrl: getUrlWithSubstitutions(
    networkTwitter.appUrl as BasicUrl,
    mockTwitterUser,
    mockTwitterPrefix,
  ),
  user: mockTwitterUser,
  prefix: mockTwitterPrefix,
};

export const mockFooUser: UserName = '_F00z-+-Uz3r_';
export const mockFooUrl: BasicUrl = `https://social.fuzz.biz/user/${mockFooUser}/profile`;
export const mockFooNetwork: SocialNetwork = {
  id: 'foo',
  preferredUrl: `https://foo.com/user-profile/${mockFooUser}`,
  appUrl: `https://app.foo.io/${mockFooUser}`,
  matcher: {
    domain: '(foo|fuzz)',
    user: '^(?:\\/user\\/)?(?:\\/)?(?<match>[^/]+)',
  },
};
export const mockFooProfile: SocialProfile = {
  id: mockFooNetwork.id,
  urlGroups: {
    scheme: 'https://',
    domain: 'social.fuzz',
    tldomain: '.biz',
    path: `/user/${mockFooUser}/profile`,
  },
  originalUrl: mockFooUrl,
  preferredUrl: getUrlWithSubstitutions(
    mockFooNetwork.preferredUrl,
    mockFooUser,
  ),
  appUrl: getUrlWithSubstitutions(
    mockFooNetwork.appUrl as BasicUrl,
    mockFooUser,
  ),
  user: mockFooUser,
};
