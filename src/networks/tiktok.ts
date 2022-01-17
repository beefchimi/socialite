import {profileReplacement} from '../capture';
import {socialitePrefix} from '../prefixes';
import type {SocialNetwork} from '../types';

const {tiktok: prefix} = socialitePrefix;

export const tiktok: SocialNetwork = {
  id: 'tiktok',
  preferredUrl: `https://tiktok.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /tiktok/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
