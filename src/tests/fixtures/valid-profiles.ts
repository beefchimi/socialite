import {socialitePrefix} from '../../prefixes';
import {
  behance as networkBehance,
  facebook as networkFacebook,
  instagram as networkInstagram,
  substack as networkSubstack,
  twitter as networkTwitter,
} from '../../networks';
import type {
  BasicUrl,
  SocialiteProfile,
  SocialiteNetwork,
  UserName,
  UrlMinCriteria,
} from '../../types';
import {getUrlWithSubstitutions} from '../../utilities';

export const mockGenericUser = '~f00+96%Hum@n_123-!';

export const mockBehanceUser: UserName = 'Uz3r_N@me!';
export const mockBehanceUrl: BasicUrl = `https://www.behance.net/${mockBehanceUser}/`;
export const mockBehanceProfile: SocialiteProfile = {
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
export const mockCustomNetwork: SocialiteNetwork = {
  id: 'custom',
  preferredUrl: `https://custom.com/user-profile/${mockCustomUser}`,
  appUrl: `https://app.custom.io/${mockCustomUser}`,
  matcher: {
    domain: /(foo|custom)/,
    user: /^(?:\/user\/)?(?:\/)?([^/]+)/,
  },
};
export const mockCustomProfile: SocialiteProfile = {
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
export const mockFacebookProfile: SocialiteProfile = {
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

export const mockInstagramUser: UserName = 'insta-account';
export const mockInstagramGroup: UrlMinCriteria = {
  domain: 'instagram',
  tldomain: '.com',
  path: `/${mockInstagramUser}`,
};
export const mockInstagramProfile: SocialiteProfile = {
  id: networkInstagram.id,
  urlGroups: {
    ...mockInstagramGroup,
  },
  originalUrl: `instagram.com/${mockInstagramUser}`,
  preferredUrl: getUrlWithSubstitutions(
    networkInstagram.preferredUrl,
    mockInstagramUser,
  ),
  appUrl: getUrlWithSubstitutions(
    networkInstagram.appUrl as BasicUrl,
    mockInstagramUser,
  ),
  user: mockInstagramUser,
};

export const mockMinimalUrl: BasicUrl = 'https://m.facebook.com/';
export const mockMinimalGroup: UrlMinCriteria = {
  scheme: 'https://',
  subdomain: 'm',
  domain: 'facebook',
  tldomain: '.com',
  path: '/',
};
export const mockMinimalProfile: SocialiteProfile = {
  id: networkFacebook.id,
  urlGroups: {
    ...mockMinimalGroup,
  },
  originalUrl: mockMinimalUrl,
  preferredUrl: getUrlWithSubstitutions(networkFacebook.preferredUrl, ''),
  appUrl: getUrlWithSubstitutions(networkFacebook.appUrl as BasicUrl, ''),
};

export const mockSubstackUrl = 'https://substack.com/';
export const mockSubstackProfile: SocialiteProfile = {
  id: networkSubstack.id,
  urlGroups: {
    scheme: 'https://',
    domain: 'substack',
    tldomain: '.com',
    path: '/',
  },
  originalUrl: mockSubstackUrl,
  preferredUrl: getUrlWithSubstitutions(networkSubstack.preferredUrl, ''),
};

export const mockTwitterPrefix = socialitePrefix.twitter;
export const mockTwitterUser: UserName = '123ABC=human0';
export const mockTwitterUrl: BasicUrl = `https://mobile.twitter.com/${mockTwitterPrefix}${mockTwitterUser}/`;
export const mockTwitterProfile: SocialiteProfile = {
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
