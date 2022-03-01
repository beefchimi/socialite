import {discordPreferredUrls} from '../capture';
import type {SocialiteNetwork} from '../types';

// Discord is difficult to solve given Socialite's current design.
// There are essentially 3 different urls to support:
// 1. User profiles (discordapp.com/users/*)
// 2. Server/channel urls (discord.com/channels/{serverid}/{channelid})
// 3. Official vanity urls (discord.gg/*)
// Since we are not yet validating against a Top-level domain (.gg),
// any `discord` url validates as true and captures the `path`.
// This degrades the confidence provided by `users` or `channels`.

// TODO: Solve this problem by improving `preferredUrl` and parsing criteria.
// https://github.com/beefchimi/socialite/issues/35
export const discord: SocialiteNetwork = {
  id: 'discord',
  preferredUrl: discordPreferredUrls.users,
  matcher: {
    domain: /discord/,
    user: /^\/(?:users\/|channels\/)?([^/]+)/,
    // TODO: If we want to support capturing EVERYTHING after
    // the first `/` (necessary for capturing the `channelid`),
    // then we would need to use the following:
    // user: /^\/(?:users\/|channels\/)?(.+)/,
  },
};
