import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const behance: SocialNetwork = {
  id: 'behance',
  preferredUrl: `https://behance.net/${profileReplacement.user}`,
  matcher: {
    domain: /behance/,
  },
};
