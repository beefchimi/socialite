import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const discord: SocialiteNetwork = {
  id: 'discord',
  preferredUrl: `https://discordapp.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /discord/,
    user: /^(?:\/users\/)?(?:\/)?([^/]+)/,
  },
};
