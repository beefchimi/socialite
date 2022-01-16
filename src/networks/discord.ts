import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const discord: SocialNetwork = {
  id: 'discord',
  preferredUrl: `https://discordapp.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /discord/,
    user: /^(?:\/users\/)?(?:\/)?([^/]+)/,
  },
};
