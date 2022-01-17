import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const twitch: SocialiteNetwork = {
  id: 'twitch',
  preferredUrl: `https://twitch.tv/${profileReplacement.user}`,
  appUrl: `https://m.twitch.tv/${profileReplacement.user}`,
  matcher: {
    domain: /twitch/,
  },
};
