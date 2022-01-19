export {
  urlCaptureGroup,
  urlRegExp,
  schemeRegExp,
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
} from './utilities';

export {MatchUserSource, UrlCaptureId} from './types';
export type {
  UrlAnatomy,
  SocialiteNetwork,
  SocialiteProfile,
  SocialiteNetworkProperties,
} from './types';
