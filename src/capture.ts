import {
  UrlCaptureId,
  // SocialCaptureId,
} from './types';
import type {UrlAnatomy} from './types';

// NOTE: Don't be mislead by the `\\` in some capture groups.
// This is a consequence of embedding within a `string`.
// Once constructed by `RegExp()`, it will be properly reduced to a single `\`.

export const urlCaptureGroup: UrlAnatomy = {
  scheme: `(?<${UrlCaptureId.Scheme}>https?://)?`,
  subdomain: `(?<${UrlCaptureId.Subdomain}>www.)?`,
  domain: `(?<${UrlCaptureId.Domain}>[\\w\\.-]+?)`,
  tldomain: `(?<${UrlCaptureId.Tldomain}>.com[/]?)?`,
  port: `(?<${UrlCaptureId.Port}>:\\d+?[/]?)?`,
  path: `(?<${UrlCaptureId.Path}>\\/.+?(?=[\\?|#]?))?`,
  parameters: `(?<${UrlCaptureId.Parameters}>\\?.+?(?=[#]?))?`,
  anchor: `(?<${UrlCaptureId.Anchor}>\\#.+?)?`,
};

export const urlRegExp = new RegExp(
  [
    '^',
    urlCaptureGroup.scheme,
    urlCaptureGroup.subdomain,
    urlCaptureGroup.domain,
    urlCaptureGroup.tldomain,
    urlCaptureGroup.port,
    urlCaptureGroup.path,
    urlCaptureGroup.parameters,
    urlCaptureGroup.anchor,
    '$',
  ].join(''),
);

export const replacement = {
  network: '{REPLACE_SOCIAL_NETWORK}',
  prefix: '{REPLACE_SOCIAL_PREFIX}',
  user: '{REPLACE_SOCIAL_USER}',
};
