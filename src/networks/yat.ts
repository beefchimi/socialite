import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const yat: SocialNetwork = {
  id: 'yat',
  preferredUrl: `https://y.at/${profileReplacement.user}`,
  matcher: {
    domain: /^y$/,
  },
};
