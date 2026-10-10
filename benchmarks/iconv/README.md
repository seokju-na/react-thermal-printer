# iconv-nano migration evaluation

Keep the existing iconv-lite implementation. iconv-nano 0.0.9 is tree-shakable and
runs in Chromium without Node globals, but it increases the bundle size for this
library's dynamic character-set API and does not cover its existing codecs.

## Reproduce

From this directory, on Node 24:

```sh
npm ci
npx playwright install chromium
npm run benchmark
```

On Linux CI, use `npx playwright install --with-deps chromium`. Dependencies are
pinned in the standalone package-lock.json; they do not affect the published
packages or the root Yarn lockfile. The command rewrites `results.json` and fails
if the observed size conclusions or browser smoke tests change.

## Measured results

Node 24.15.0, esbuild 0.28.2, Chromium 156.0.8078.4. All cases use the same browser
IIFE output, ES2020 target, minification, and gzip level 9. Sizes are bytes.

| Case | Minified | Gzip |
| --- | ---: | ---: |
| Current codec wrapper, all existing character sets | 527,192 | 201,559 |
| iconv-nano wrapper, only the 18 supported character sets | 820,464 | 320,663 |
| iconv-lite, only CP1252 encode requested | 526,136 | 201,043 |
| iconv-nano, only CP1252 encode requested | 2,490 | 1,287 |

The dynamic codec wrapper gets **59.1% larger after gzip**, even though the
candidate omits 20 currently supported character sets. The single-codec example
gets **99.4% smaller**, demonstrating real tree shaking when the encoding is
selected statically. The current API accepts a character set at runtime, so its
mapping keeps every referenced codec reachable. The candidate uses explicit
static codec references, not an opaque dynamic namespace lookup.

These are codec-layer measurements, not whole-app sizes or a behaviorally
complete replacement. The baseline reads the actual production wrapper; the
candidate generates a static mapping from it. Adding missing codecs would make
the candidate larger still. Browser decoding alone cannot replace the library's
text-to-printer-byte encoding requirement.

## Compatibility

The default `pc437_usa` codec is missing from iconv-nano. The full list of 20
regressions is recorded in `results.json`. Four declared character sets are
already unsupported by iconv-lite 0.6.3 (`CP853`, `CP1098`, `CP1118`, `CP1119`);
these are reported separately and are not attributed to this migration.

Chromium successfully round-trips CP1252, Japanese, Korean, Simplified Chinese,
and Traditional Chinese text. `Buffer`, `process`, and `require` remain undefined
on the page. Thus the tested codecs work in a real browser without global Node
polyfills. Other browsers were not tested.

The audit compares nine text samples per shared character set and every possible
single byte when decoding. It finds 25 encoding differences and decoding
differences in nine character sets. Examples include emoji replacement (`??`
versus `?` for CP1252) and undefined CP1252 bytes (`U+FFFD` versus control code
points). For multibyte codecs, the single-byte probes include malformed/truncated
input; this is not an exhaustive multibyte conformance test. Exact differences
and browser round trips are recorded in `results.json`.

A future opt-in API that allows consumers to choose codecs statically could
benefit from iconv-nano. Replacing the current default implementation does not
meet the size or compatibility requirements, so this PR contains only the
reproducible evaluation.

Upstream API and encoding coverage: [iconv-nano README](https://github.com/jeremy-code/iconv-nano#readme).
