export {urlCaptureGroup, defaultUserMatcher} from './capture';

export {allSocialNetworks, defaultSocialNetworks} from './data';
export {socialNetworkPrefixes} from './prefixes';

export {Socialite} from './socialite';

export {MatchUserSource, UrlCaptureId} from './types';
export type {
  UrlAnatomy,
  SocialNetwork,
  SocialNetworkProperty,
  SocialNetworkProperties,
  SocialProfile,
} from './types';

export {
  filterNullishValuesFromObject,
  mergeRegExp,
  constructFullLineRegExp,
} from './utilities';
