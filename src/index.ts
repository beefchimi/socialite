export {
  urlCaptureGroup,
  urlRegExp,
  profileReplacement,
  defaultUserMatcher,
} from './capture';

export {allSocialNetworks, defaultSocialNetworks} from './data';
export {socialNetworkPrefixes} from './prefixes';
export {Socialite} from './socialite';

export {
  filterNullishValuesFromObject,
  filterNetworkProperties,
  getNetworkFromDomain,
  mergeRegExp,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './utilities';

export {MatchUserSource, UrlCaptureId} from './types';
export type {
  UrlAnatomy,
  SocialProfile,
  SocialNetwork,
  SocialNetworkProperty,
  SocialNetworkProperties,
} from './types';
