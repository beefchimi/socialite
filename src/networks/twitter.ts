import {replacement} from '../capture';
import type {SocialNetwork} from '../types';

const prefix = '@';

export const twitter: SocialNetwork = {
  id: 'twitter',
  title: 'Twitter',
  preferredUrl: `https://twitter.com/${prefix}${replacement.user}`,
  overrides: {
    subdomain: '',
    tldomain: '',
    leadingPath: '',
    trailingPath: '',
  },
  appUrl: `https://mobile.twitter.com/${prefix}${replacement.user}`,
  prefix,
};
