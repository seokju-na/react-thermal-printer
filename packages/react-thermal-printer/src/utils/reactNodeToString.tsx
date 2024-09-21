import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const replaces = [
  { from: /&quot;/g, to: `"` },
  { from: /&amp;/g, to: '&' },
  { from: /&#x27;/g, to: `'` },
  { from: /&lt;/g, to: '<' },
  { from: /&gt;/g, to: '>' },
];

export function reactNodeToString(node: ReactNode) {
  let str = renderToStaticMarkup(node as any);
  for (const { from, to } of replaces) {
    str = str.replace(from, to);
  }
  return str;
}
