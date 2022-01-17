import {profileReplacement} from '../capture';
import {socialitePrefix} from '../prefixes';
import type {SocialiteNetwork} from '../types';

const {twitter: prefix} = socialitePrefix;

export const twitter: SocialiteNetwork = {
  id: 'twitter',
  preferredUrl: `https://twitter.com/${prefix}${profileReplacement.user}`,
  appUrl: `https://mobile.twitter.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /twitter/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
