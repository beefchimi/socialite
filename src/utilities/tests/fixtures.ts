import {profileReplacement} from '../../capture';
import type {DiscordProfile} from '../../types';

export const mockObject = {
  one: 1,
  two: 1 + 1,
  three: undefined,
  four: '4',
  five: 'five',
  six: true,
  seven: false,
  eight: ['e', 'i', 'g', 'h', 't'],
  nine: null,
  ten: {eleven: 11},
};

export const mockRegExps = [
  /^(abc|123)/,
  /(?<Group>https?:\/\/)?/g,
  /[^/]+/gm,
  /(?:\w\d)$/gi,
];

export const mockFullUrl =
  'https://www.domain.com:123/path/to?query=param#hash-anchor';

export const mockPartialUrl = 'http://website.ca?query=param';

export const mockReplacementUrl = `https://domain.com/${profileReplacement.prefix}${profileReplacement.user}`;

export const mockDiscordUsersProfile: DiscordProfile = {
  id: 'discord',
  urlGroups: {
    domain: 'discordapp',
    tldomain: '.com',
    scheme: 'https://',
    subdomain: 'www.',
    path: '/users/username',
  },
  originalUrl: 'https://www.discordapp.com/users/username',
  preferredUrl: 'https://discordapp.com/users/username',
  user: 'username',
};

export const mockDiscordChannelsProfile: DiscordProfile = {
  id: 'discord',
  urlGroups: {
    domain: 'discord',
    tldomain: '.com',
    scheme: 'http',
    subdomain: 'www.',
    path: '/channels/foo',
  },
  originalUrl: 'http://www.discord.com/channels/foo',
  preferredUrl: 'https://discord.com/channels/foo',
  user: 'foo',
};

export const mockDiscordVanityProfile: DiscordProfile = {
  id: 'discord',
  urlGroups: {
    domain: 'discord',
    tldomain: '.gg',
    path: '/bar123',
  },
  originalUrl: 'discord.gg/bar123',
  preferredUrl: 'https://discord.gg/bar123',
  user: 'bar123',
};
