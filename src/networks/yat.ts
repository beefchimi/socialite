import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const yat: SocialiteNetwork = {
  id: 'yat',
  preferredUrl: `https://y.at/${profileReplacement.user}`,
  matcher: {
    domain: /^y$/,
  },
};
