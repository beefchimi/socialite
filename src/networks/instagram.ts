import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const instagram: SocialiteNetwork = {
  id: 'instagram',
  preferredUrl: `https://instagram.com/${profileReplacement.user}`,
  appUrl: `https://m.instagram.com/${profileReplacement.user}`,
  matcher: {
    domain: /instagram/,
  },
};
