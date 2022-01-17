import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const keybase: SocialiteNetwork = {
  id: 'keybase',
  preferredUrl: `https://keybase.io/${profileReplacement.user}`,
  matcher: {
    domain: /keybase/,
  },
};
