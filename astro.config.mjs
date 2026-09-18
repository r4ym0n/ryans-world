// @ts-check
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
// site：RSS、sitemap 与规范链接所需的站点地址；自定义域名后再改这里
export default defineConfig({
  site: 'https://ryans-world-chi.vercel.app',
  trailingSlash: 'always',
  redirects: {
    '/posts/标签爆炸': '/posts/42个标签/',
    '/posts/FIRE_0': '/posts/fire-工作从必须变成选择/',
    '/posts/fire_0': '/posts/fire-工作从必须变成选择/',
    '/posts/FIRE-工作从必须变成选择': '/posts/fire-工作从必须变成选择/',
    '/posts/fire_1': '/posts/fire-核不在退休/',
    '/posts/FIRE-核不在退休': '/posts/fire-核不在退休/',
    '/posts/fire_2': '/posts/fire-从百分之二十往上抬/',
    '/posts/FIRE-从百分之二十往上抬': '/posts/fire-从百分之二十往上抬/',
  },
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
