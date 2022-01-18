---
'socialitejs': patch
---

`Socialite.parseProfile()` can now accept either a url string or a `UrlMinCriteria` object.

`Socialite.parseUrl()` now behaves slightly differently.

- The trailing `/` from a `tldomain` is now removed.
- The prefix `:` from a `port` is retained.
