import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const onlyfans: SocialiteNetwork = {
  id: 'onlyfans',
  preferredUrl: `https://onlyfans.com/${profileReplacement.user}`,
  matcher: {
    domain: /onlyfans/,
    // Unless we want to qualify this with a `prefix`,
    // we probably do not need to include the `user` prop.
    user: `[^\\/]+`,
  },
};
