import { defineConfig } from 'vitepress';
import references from '../references/manifest.json' with { type: 'json' };

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
        text: 'References',
        items: references,
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
