import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const onlyfans: SocialiteNetwork = {
  id: 'onlyfans',
  preferredUrl: `https://onlyfans.com/${profileReplacement.user}`,
  matcher: {
    domain: /onlyfans/,
    user: `[^\\/]+`,
  },
};
