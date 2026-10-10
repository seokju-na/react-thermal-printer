import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';
import lite from 'iconv-lite';
import * as nano from 'iconv-nano';
import { chromium } from 'playwright';

const directory = dirname(fileURLToPath(import.meta.url));
const source = await readFile(resolve(directory, '../../packages/printer/src/iconv.ts'), 'utf8');
const labels = Object.fromEntries([...source.matchAll(/ {2}(\w+): '([^']+)'/g)].map(([, key, label]) => [key, label]));
assert.equal(Object.keys(labels).length, 42);
const aliases = {
  CP874: 'windows_874',
  RK1048: 'rk1048',
  'ISO-8859-2': 'iso_8859_2',
  'ISO-8859-7': 'iso_8859_7',
  'ISO-8859-15': 'iso_8859_15',
  'EUC-JP': 'euc_jp',
  'EUC-KR': 'euc_kr',
  GB18030: 'gb18030',
  'Big5-HKSCS': 'big5_hkscs',
};
const availableCodecs = new Map(Object.entries(nano));
const nanoLabel = label => aliases[label] ?? label.toLowerCase().replace('win', 'windows_');
const supported = Object.entries(labels).filter(([, label]) => availableCodecs.get(nanoLabel(label))?.encode);
const missing = Object.entries(labels).filter(
  ([, label]) => lite.encodingExists(label) && !availableCodecs.get(nanoLabel(label))?.encode
);
const existingUnsupported = Object.entries(labels).filter(([, label]) => !lite.encodingExists(label));
const mapping = supported.map(([key, label]) => `${key}: iconv.${nanoLabel(label)}`).join(',\n');
const candidate = `import * as iconv from 'iconv-nano';
const codecs = {${mapping}};
export function encode(text, characterSet) { return codecs[characterSet].encode(text); }
export function decode(bytes, characterSet) { return codecs[characterSet].decode(bytes); }`;
// Same codec API as production, including its dynamically selected character set.
const baseline = source.replace(
  "import type { CharacterSet } from './CharacterSet.js';",
  'type CharacterSet = string;'
);
const cases = {
  currentCodec: baseline,
  nanoSupportedSubset: candidate,
  liteSingleEncoding: "import iconv from 'iconv-lite'; export const encode = text => iconv.encode(text, 'CP1252');",
  nanoSingleEncoding: "import { windows_1252 } from 'iconv-nano'; export const encode = windows_1252.encode;",
};
const sizes = {};
const bundles = {};
for (const [name, contents] of Object.entries(cases)) {
  const result = await build({
    stdin: { contents, resolveDir: directory, loader: 'ts' },
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: name,
    target: 'es2020',
    minify: true,
    write: false,
    metafile: true,
  });
  const bytes = result.outputFiles[0].contents;
  bundles[name] = new TextDecoder().decode(bytes);
  sizes[name] = {
    minifiedBytes: bytes.length,
    gzipBytes: gzipSync(bytes, { level: 9 }).length,
    retainedInputModules: Object.values(result.metafile.outputs).flatMap(output =>
      Object.values(output.inputs).filter(input => input.bytesInOutput > 0)
    ).length,
  };
}

const browser = await chromium.launch();
let browserResults;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  for (const name of ['currentCodec', 'nanoSupportedSubset']) {
    await page.addScriptTag({ content: bundles[name] });
  }
  browserResults = await page.evaluate(
    ({ supported, missing }) => {
      const before = {
        Buffer: typeof globalThis.Buffer,
        process: typeof globalThis.process,
        require: typeof globalThis.require,
      };
      const samples = ['Hello 123', '안녕하세요', '日本語', '中文', '繁體中文', '€', '😀', '\ufffd', '\ud800'];
      const toHex = bytes => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
      const encodeDifferences = [];
      const decodeDifferences = [];
      const roundTrips = [];
      for (const [characterSet] of supported) {
        for (const text of samples) {
          const oldBytes = currentCodec.encode(text, characterSet);
          const newBytes = nanoSupportedSubset.encode(text, characterSet);
          if (toHex(oldBytes) !== toHex(newBytes)) {
            encodeDifferences.push({ characterSet, text, current: toHex(oldBytes), nano: toHex(newBytes) });
          }
        }
        let mismatches = 0;
        const examples = [];
        for (let byte = 0; byte < 256; byte++) {
          const input = Uint8Array.of(byte);
          const current = currentCodec.decode(input, characterSet);
          const nano = nanoSupportedSubset.decode(input, characterSet);
          if (current !== nano) {
            mismatches++;
            if (examples.length < 3) examples.push({ byte, current, nano });
          }
        }
        if (mismatches) decodeDifferences.push({ characterSet, mismatches, examples });
      }
      for (const [characterSet, text] of [
        ['wpc1252', 'Café €'],
        ['japan', '日本語'],
        ['korea', '안녕하세요'],
        ['china', '中文'],
        ['hk_tw', '繁體中文'],
      ]) {
        const bytes = nanoSupportedSubset.encode(text, characterSet);
        roundTrips.push({ characterSet, text, passed: nanoSupportedSubset.decode(bytes, characterSet) === text });
      }
      return {
        globals: before,
        roundTrips,
        encodeDifferences,
        decodeDifferences,
        unsupportedDefault: missing.some(([key]) => key === 'pc437_usa'),
      };
    },
    { supported, missing }
  );
  assert.deepEqual(browserResults.globals, { Buffer: 'undefined', process: 'undefined', require: 'undefined' });
  assert.ok(
    browserResults.roundTrips.every(result => result.passed),
    'Browser round trips must pass'
  );
  assert.ok(browserResults.unsupportedDefault, 'The default CP437 codec is unsupported by iconv-nano');
  assert.ok(
    sizes.nanoSingleEncoding.gzipBytes < sizes.liteSingleEncoding.gzipBytes,
    'Single-codec tree shaking should improve size'
  );
  assert.ok(
    sizes.nanoSupportedSubset.gzipBytes > sizes.currentCodec.gzipBytes,
    'The required codec subset currently regresses size'
  );
  const report = {
    node: process.version,
    chromium: browser.version(),
    versions: { esbuild: '0.28.2', iconvLite: '0.6.3', iconvNano: '0.0.9', playwright: '1.64.0' },
    sizes,
    supportedCharacterSets: supported.map(([key]) => key),
    missingCharacterSets: Object.fromEntries(missing),
    alreadyUnsupportedCharacterSets: Object.fromEntries(existingUnsupported),
    browser: browserResults,
  };
  await writeFile(resolve(directory, 'results.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    JSON.stringify(
      {
        sizes,
        missing: missing.length,
        existingUnsupported,
        browser: browser.version(),
        roundTrips: browserResults.roundTrips,
        encodeDifferences: browserResults.encodeDifferences.length,
        decodeDifferences: browserResults.decodeDifferences.length,
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
