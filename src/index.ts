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
  filterNetworkProperties,
  mergeRegExp,
  getDiscordPreferredUrl,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './utilities';

export {MatchUserSource, UrlCaptureId} from './types';
export type {
  DiscordUrlCriteria,
  UrlAnatomy,
  SocialiteNetwork,
  SocialiteProfile,
  SocialiteNetworkProperties,
} from './types';
