import {UrlCaptureId} from './types';
import type {UrlAnatomy} from './types';
import {constructRegExp} from './utilities';

// NOTE: Don't be mislead by the `\\` in some capture groups.
// This is a consequence of embedding within a `string`.
// Once constructed by `RegExp()`, it will be properly reduced to a single `\`.

export const urlCaptureGroup: UrlAnatomy = {
  scheme: `(?<${UrlCaptureId.Scheme}>https?://)?`,
  subdomain: `(?<${UrlCaptureId.Subdomain}>www\\.)?`,
  domain: `(?<${UrlCaptureId.Domain}>[\\w\\.-]+?)`,
  tldomain: `(?<${UrlCaptureId.Tldomain}>\\.\\w{2,5}[/]?)?`,
  port: `(?<${UrlCaptureId.Port}>:\\d+?[/]?)?`,
  path: `(?<${UrlCaptureId.Path}>\\/.+?(?=[\\?|#]?))?`,
  parameters: `(?<${UrlCaptureId.Parameters}>\\?.+?(?=[#]?))?`,
  anchor: `(?<${UrlCaptureId.Anchor}>\\#.+?)?`,
};

export const urlRegExp = constructRegExp(
  urlCaptureGroup.scheme,
  urlCaptureGroup.subdomain,
  urlCaptureGroup.domain,
  urlCaptureGroup.tldomain,
  urlCaptureGroup.port,
  urlCaptureGroup.path,
  urlCaptureGroup.parameters,
  urlCaptureGroup.anchor,
);

export const profileReplacement = {
  user: '{REPLACE_PROFILE_USER}',
  prefix: '{REPLACE_PROFILE_PREFIX}',
};

export const defaultSocialMatcher = {
  // NOTE: `domain` is not used internally,
  // but it may be useful for consumers.
  domain: '[^\\.]+$',
  user: '[^\\/]+',
};

export const defaultUserRegExp = new RegExp(defaultSocialMatcher.user);
