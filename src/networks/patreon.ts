import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const patreon: SocialNetwork = {
  id: 'patreon',
  preferredUrl: `https://patreon.com/${profileReplacement.user}`,
  matcher: {
    domain: /patreon/,
  },
};
