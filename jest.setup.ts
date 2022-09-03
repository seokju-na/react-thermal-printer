import { TextEncoder } from 'node:util';

// https://github.com/jsdom/jsdom/issues/2524
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
