import {getUrlWithSubstitutions} from '../../helpers';
import {socialNetworkPrefixes} from '../../prefixes';
import {
  behance as networkBehance,
  facebook as networkFacebook,
  twitter as networkTwitter,
} from '../../networks';
import type {
  BasicUrl,
  SocialProfile,
  SocialNetwork,
  UserName,
} from '../../types';

export const mockBehanceUser: UserName = 'Uz3r_N@me!';
export const mockBehanceUrl: BasicUrl = `https://www.behance.net/${mockBehanceUser}/`;
export const mockBehanceProfile: SocialProfile = {
  id: networkBehance.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'www',
    domain: 'behance',
    tldomain: '.net',
    path: `/${mockBehanceUser}/`,
  },
  originalUrl: mockBehanceUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkBehance.preferredUrl,
    mockBehanceUser,
  ),
  user: mockBehanceUser,
};

export const mockCustomUser: UserName = '_F00z-+-Uz3r_';
export const mockCustomUrl: BasicUrl = `https://social.foo.biz/user/${mockCustomUser}/profile`;
export const mockCustomNetwork: SocialNetwork = {
  id: 'custom',
  preferredUrl: `https://custom.com/user-profile/${mockCustomUser}`,
  appUrl: `https://app.custom.io/${mockCustomUser}`,
  matcher: {
    domain: /(foo|custom)/,
    user: /^(?:\/user\/)?(?:\/)?([^/]+)/,
  },
};
export const mockCustomProfile: SocialProfile = {
  id: mockCustomNetwork.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'social',
    domain: 'foo',
    tldomain: '.biz',
    path: `/user/${mockCustomUser}/profile`,
  },
  originalUrl: mockCustomUrl,
  preferredUrl: getUrlWithSubstitutions(
    mockCustomNetwork.preferredUrl,
    mockCustomUser,
  ),
  appUrl: getUrlWithSubstitutions(
    mockCustomNetwork.appUrl as BasicUrl,
    mockCustomUser,
  ),
  user: mockCustomUser,
};

export const mockFacebookUser: UserName = 'FacebookUser1';
export const mockFacebookUrl: BasicUrl = `https://sub.facebook.com/${mockFacebookUser}`;
export const mockFacebookProfile: SocialProfile = {
  id: networkFacebook.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'sub',
    domain: 'facebook',
    tldomain: '.com',
    path: `/${mockFacebookUser}`,
  },
  originalUrl: mockFacebookUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkFacebook.preferredUrl,
    mockFacebookUser,
  ),
  appUrl: getUrlWithSubstitutions(
    networkFacebook.appUrl as BasicUrl,
    mockFacebookUser,
  ),
  user: mockFacebookUser,
};

export const mockMinimalUser: UserName = '';
export const mockMinimalUrl: BasicUrl = `https://m.facebook.com/${mockMinimalUser}`;
export const mockMinimalProfile: SocialProfile = {
  id: networkFacebook.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'm',
    domain: 'facebook',
    tldomain: '.com/',
  },
  originalUrl: mockMinimalUrl,
  preferredUrl: getUrlWithSubstitutions(
    networkFacebook.preferredUrl,
    mockMinimalUser,
  ),
  appUrl: getUrlWithSubstitutions(
    networkFacebook.appUrl as BasicUrl,
    mockMinimalUser,
  ),
};

export const mockTwitterPrefix = socialNetworkPrefixes.twitter;
export const mockTwitterUser: UserName = '123ABC=human0';
export const mockTwitterUrl: BasicUrl = `https://mobile.twitter.com/${mockTwitterPrefix}${mockTwitterUser}/`;
export const mockTwitterProfile: SocialProfile = {
  id: networkTwitter.id,
  urlGroups: {
    scheme: 'https://',
    subdomain: 'mobile',
    domain: 'twitter',
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
