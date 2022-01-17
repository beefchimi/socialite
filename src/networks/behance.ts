import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const behance: SocialiteNetwork = {
  id: 'behance',
  preferredUrl: `https://behance.net/${profileReplacement.user}`,
  matcher: {
    domain: /behance/,
  },
};
