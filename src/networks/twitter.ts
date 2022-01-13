import {profileReplacement} from '../capture';
import {socialNetworkPrefixes} from '../prefixes';
import type {SocialNetwork} from '../types';

const {twitter: prefix} = socialNetworkPrefixes;

export const twitter: SocialNetwork = {
  id: 'twitter',
  title: 'Twitter',
  preferredUrl: `https://twitter.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: 'twitter',
    user: `${prefix}[^\\/]+`,
  },
  appUrl: `https://mobile.twitter.com/${prefix}${profileReplacement.user}`,
  prefix,
};
