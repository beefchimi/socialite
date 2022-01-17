export {
  urlCaptureGroup,
  urlRegExp,
  profileReplacement,
  defaultUserMatcher,
} from './capture';

export {socialiteNetworks, defaultSocialiteNetworks} from './data';
export type {SocialiteId} from './data';

export {socialitePrefix} from './prefixes';

export {Socialite} from './socialite';

export {
  filterNullishValuesFromObject,
  filterNetworkProperties,
  mergeRegExp,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './utilities';

export {MatchUserSource, UrlCaptureId} from './types';
export type {
  UrlAnatomy,
  SocialiteProfile,
  SocialNetwork,
  SocialiteNetworkProperties,
} from './types';
