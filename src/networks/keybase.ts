import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const keybase: SocialNetwork = {
  id: 'keybase',
  preferredUrl: `https://keybase.io/${profileReplacement.user}`,
  matcher: {
    domain: /keybase/,
  },
};
