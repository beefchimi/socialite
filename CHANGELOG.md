# Socialite

## 0.0.2

### Patch Changes

- ffdd379: Added `getNetwork()` and `getPreferredUrl()` methods. Also renamed `getNetworks()` to `getAllNetworks()`.
- 0d7f799: No longer matching against YouTube short urls, since they do not link to channels.
- 8584063: Stricter pattern matching for all networks with a leading path.
- 864601d: Renamed many types and interfaces.
- 9d599d2: `Socialite.parseProfile()` can now accept either a url string or a `UrlMinCriteria` object.

  `Socialite.parseUrl()` now behaves slightly differently.

  - The trailing `/` from a `tldomain` is now removed.
  - The prefix `:` from a `port` is retained.

- 02545a7: Made previously private `getNetworkFromDomain()` a public method.
- 8114b95: Further reduce complexity by keeping a single slash as part of `path`, and leaving the trailing `.` as part of `subdomain`.

## 0.0.1

### Patch Changes

- [#1](https://github.com/beefchimi/socialite/pull/1) [`25db0ed`](https://github.com/beefchimi/socialite/commit/25db0ed1a02385e9e9402369680114b8e1d9d12a): Prepare Socialite for initial release.
