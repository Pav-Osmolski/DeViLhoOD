# devilhood

An independent portal to music, memory and experiments by Pawel Osmolski.

## Run locally

Requires PHP 8.0 or newer. No package installation or build step is needed.

```sh
php -S localhost:8000
```

Open `http://localhost:8000`. The PHP development server does not read `.htaccess`; the `media.htm` HTML fallback still forwards to `media.php`.

## Design and implementation

- Both pages use `images/devilhood-background-latin.jpg` as a fixed cover background. The shared brand accent is `--perfect-purple: #8b18bc`, including text, links and canvas artwork.
- Responsive portal with six original destinations, generative contour animation and pointer/keyboard image previews.
- The existing lowercase Blackadder-style devilhood wordmark is reused as an image, so visitors do not need the font installed. No commercial font file is redistributed.
- The supplied `fonts/The-Dreamer.woff` provides the handwritten type for “frequency.”, “archive.” and “Everything leaves an echo.”.
- Vanilla JavaScript and CSS replace the active jQuery/fullPage/Flash-era integrations. Unused legacy CSS, JavaScript, font bundles, jPlayer/Flash files, easing/scrolling vendors and the unused gzip.php helper are removed. Error pages use the shared stylesheet and supplied font.
- Reduced-motion preferences, an explicit pause control, keyboard focus, skip links and native audio controls are supported.
- `media.php` preserves all 73 archive entries and their original credits and 105 non-navigation links. Search and in-page playback are progressive enhancements; downloads remain available without JavaScript.
- The obsolete Universal Analytics integration is no longer loaded.

## Deploy

Deploy the repository changes, including file deletions, over the existing PHP/Apache site. Include the hidden `.htaccess` file and the updated `error-pages/` pages. Preserve all existing `media/`, `private/`, `scores/` and `images/` files; no cleanup is applied to those folders. Recordings and scores are hosted assets that are not checked into this repository; this update does not recreate them.

The Apache rewrite rule sends `media.htm` to `media.php` with HTTP 301, preserving query strings. Browser redirects retain legacy collection fragments such as `#covers`. Apache requires `mod_rewrite` and permission to read `.htaccess` (`AllowOverride FileInfo`). When rewrite rules are unavailable, `media.htm` provides a browser redirect and a direct link. Its JavaScript fallback preserves query strings and fragments; the meta-refresh fallback targets the base archive URL.

The existing host redirects and Apache ErrorDocument mappings are retained. The four error pages now use the shared design, root-relative assets and direct links to the portal and media.php. On non-Apache hosting, configure the equivalent permanent redirect from `/media.htm` to `/media.php` in the hosting configuration.

After upload, verify `/`, `/media.php`, and `/media.htm?test=1#covers`, then play a local recording and an externally hosted recording. Original external URLs are preserved, including historical HTTP destinations; their availability and HTTPS support must be checked on the live host. HTTPS browsers may prevent playback from an HTTP-only audio host; the original download links remain accessible.

## Validation

The redesign was checked in desktop and mobile Edge: six destinations, no horizontal overflow, keyboard image previews, motion toggle, reduced motion, all 73 entries, search and empty results, playback error/close behavior, JavaScript-free archive, and query/fragment forwarding. PHP syntax checks and JavaScript syntax checks pass. A source comparison confirms all 105 active original archive URLs are retained.

The permanent redirect was checked with a local PHP router matching the Apache rule. The production Apache configuration and actual hosted music playback require post-deployment verification.

## License

Copyright © 2026 Pawel Osmolski. All rights reserved. See [LICENSE](LICENSE). Third-party material retains its own rights and terms.
