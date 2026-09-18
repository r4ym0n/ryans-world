// 写作库在 content/（Obsidian vault）。
// 只有 content/posts/ 会变成网页；Writing-Studio/ 不发布。
// posts/drafts/ 里的文件视为草稿。
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
      categories: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      slug: z.string().optional(),
    })
    .transform((data) => ({
      ...data,
      tags: [...new Set([...data.tags, ...(data.categories ?? [])])],
    })),
});

export const collections = { blog };
