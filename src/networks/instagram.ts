import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const instagram: SocialNetwork = {
  id: 'instagram',
  preferredUrl: `https://instagram.com/${profileReplacement.user}`,
  appUrl: `https://m.instagram.com/${profileReplacement.user}`,
  matcher: {
    domain: /instagram/,
  },
};
