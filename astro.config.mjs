// @ts-check
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
// site：RSS、sitemap 与规范链接所需的站点地址；自定义域名后再改这里
export default defineConfig({
  site: 'https://ryans-world-chi.vercel.app',
  trailingSlash: 'always',
  integrations: [
    sitemap(),
    pagefind({
      indexConfig: {
        forceLanguage: 'zh',
        keepIndexUrl: true,
      },
    }),
  ],
});
