import * as networks from './networks';

export const defaultSocialiteNetworks = [
  networks.facebook,
  networks.instagram,
  networks.linkedin,
  networks.reddit,
  networks.tiktok,
  networks.twitch,
  networks.twitter,
  networks.youtube,
];

export const socialiteNetworks = {...networks};

export type SocialiteId = keyof typeof socialiteNetworks;
