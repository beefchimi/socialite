import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const patreon: SocialiteNetwork = {
  id: 'patreon',
  preferredUrl: `https://patreon.com/${profileReplacement.user}`,
  matcher: {
    domain: /patreon/,
  },
};
