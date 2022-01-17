import {profileReplacement} from '../capture';
import {socialitePrefix} from '../prefixes';
import type {SocialNetwork} from '../types';

const {twitter: prefix} = socialitePrefix;

export const twitter: SocialNetwork = {
  id: 'twitter',
  preferredUrl: `https://twitter.com/${prefix}${profileReplacement.user}`,
  appUrl: `https://mobile.twitter.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /twitter/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
