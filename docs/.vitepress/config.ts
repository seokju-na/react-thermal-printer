import { defineConfig } from 'vitepress';
import references from '../references/manifest.json' with { type: 'json' };

const items = references[0]!.items;

export default defineConfig({
  title: 'react-thermal-printer',
  lastUpdated: true,
  metaChunk: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: 'Guides',
        items: [
          {
            text: 'Getting Started',
            link: 'getting-started.md',
          },
          {
            text: 'Usage',
            link: 'usage.md',
          },
        ],
      },
      {
        text: 'References',
        items: items.map(item => {
          return {
            ...item,
            collapsed: false,
          };
        }),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/seokju-na/react-thermal-printer' },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/react-thermal-printer',
        ariaLabel: 'npm',
      },
    ],
  },
});
