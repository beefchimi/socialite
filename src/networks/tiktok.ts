import {profileReplacement} from '../capture';
import {socialNetworkPrefixes} from '../prefixes';
import type {SocialNetwork} from '../types';

const {tiktok: prefix} = socialNetworkPrefixes;

export const tiktok: SocialNetwork = {
  id: 'tiktok',
  preferredUrl: `https://tiktok.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /tiktok/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
