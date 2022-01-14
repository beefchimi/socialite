import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const twitch: SocialNetwork = {
  id: 'twitch',
  preferredUrl: `https://twitch.tv/${profileReplacement.user}`,
  appUrl: `https://m.twitch.tv/${profileReplacement.user}`,
  matcher: {
    domain: /twitch/,
  },
};
