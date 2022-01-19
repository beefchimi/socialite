import {UrlCaptureId} from './types';

// NOTE: Don't be mislead by the `\\` in some capture groups.
// This is a consequence of embedding within a `string`.
// Once constructed by `RegExp()`, it will be properly reduced to a single `\`.

function constructFullLineRegExp(...captureGroups: (string | RegExp)[]) {
  return new RegExp(['^', ...captureGroups, '$'].join(''));
}

export const urlCaptureGroup = {
  scheme: `(?<${UrlCaptureId.Scheme}>https?://)?`,
  domain: `(?<${UrlCaptureId.Domain}>[\\w\\.-]+?)`,
  tldomain: `(?<${UrlCaptureId.Tldomain}>\\.\\w{2,5})?`,
  port: `(?<${UrlCaptureId.Port}>:\\d+?)?`,
  path: `(?<${UrlCaptureId.Path}>\\/.*?(?=[\\?|#]?))?`,
  parameters: `(?<${UrlCaptureId.Parameters}>\\?.+?(?=[#]?))?`,
  anchor: `(?<${UrlCaptureId.Anchor}>\\#.+?)?`,
};

export const urlRegExp = constructFullLineRegExp(
  urlCaptureGroup.scheme,
  urlCaptureGroup.domain,
  urlCaptureGroup.tldomain,
  urlCaptureGroup.port,
  urlCaptureGroup.path,
  urlCaptureGroup.parameters,
  urlCaptureGroup.anchor,
);

export const schemeRegExp = /^(?<scheme>https?:\/\/)/;

export const profileReplacement = {
  user: '{REPLACE_PROFILE_USER}',
  prefix: '{REPLACE_PROFILE_PREFIX}',
};

export const defaultUserMatcher = {
  subdomain: /[^.]+/,
  path: /[^/]+/,
};
