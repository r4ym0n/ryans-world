// 文章集合：直接读取项目根下的 posts/ 目录（Obsidian 里的写作入口）
// 文件名约定：YYYY-MM-DD-english-slug.md
// URL 默认剥掉日期前缀；也可在 frontmatter 里用 slug: 自定义
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
  }),
});

export const collections = { blog };
