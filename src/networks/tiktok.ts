import {profileReplacement} from '../capture';
import {socialitePrefix} from '../prefixes';
import type {SocialiteNetwork} from '../types';

const {tiktok: prefix} = socialitePrefix;

export const tiktok: SocialiteNetwork = {
  id: 'tiktok',
  preferredUrl: `https://tiktok.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /tiktok/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
