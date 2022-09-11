import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const replaces = [
  { from: /&quot;/g, to: `"` },
  { from: /&amp;/g, to: `&` },
  { from: /&#x27;/g, to: `'` },
  { from: /&lt;/g, to: `<` },
  { from: /&gt;/g, to: `>` },
];

export function reactNodeToString(node: ReactNode) {
  let str = renderToStaticMarkup(<>{node}</>);
  replaces.forEach(({ from, to }) => {
    str = str.replace(from, to);
  });
  return str;
}
