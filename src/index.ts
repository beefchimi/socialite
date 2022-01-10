import type {SocialiteTest} from './types';

export function socialite({message = '@beefchimi'}: SocialiteTest) {
  return `This is a ${message} package!`;
}
