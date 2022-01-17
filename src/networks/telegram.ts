import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const telegram: SocialiteNetwork = {
  id: 'telegram',
  preferredUrl: `https://t.me/${profileReplacement.user}`,
  matcher: {
    domain: /telegram|t$/,
  },
};
