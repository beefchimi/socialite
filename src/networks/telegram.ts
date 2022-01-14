import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const telegram: SocialNetwork = {
  id: 'telegram',
  preferredUrl: `https://t.me/${profileReplacement.user}`,
  matcher: {
    domain: /telegram|t$/,
  },
};

// Should capture:
// t
// telegram
// sub.t
// sub.telegram

// Should NOT capture:
// twitter
// www.twitter
// facebook
// www.facebook
