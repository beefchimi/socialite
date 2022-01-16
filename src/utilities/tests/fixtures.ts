import {profileReplacement} from '../../capture';

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
