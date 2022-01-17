import {profileReplacement} from '../capture';
import {socialitePrefix} from '../prefixes';
import type {SocialiteNetwork} from '../types';

const {medium: prefix} = socialitePrefix;

export const medium: SocialiteNetwork = {
  id: 'medium',
  preferredUrl: `https://medium.com/${prefix}${profileReplacement.user}`,
  matcher: {
    domain: /medium/,
    user: `${prefix}[^\\/]+`,
  },
  prefix,
};
