import {replacement} from '../capture';
import type {SocialNetwork} from '../types';

export const facebook: SocialNetwork = {
  id: 'facebook',
  title: 'Facebook',
  preferredUrl: `https://facebook.com/${replacement.user}`,
  overrides: {
    subdomain: '',
    tldomain: '',
    leadingPath: '',
    trailingPath: '',
  },
  appUrl: undefined,
  prefix: undefined,
};
