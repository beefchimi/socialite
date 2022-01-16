import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const telegram: SocialNetwork = {
  id: 'telegram',
  preferredUrl: `https://t.me/${profileReplacement.user}`,
  matcher: {
    domain: /telegram|t$/,
  },
};
