import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** 生产环境隐藏草稿；本地 dev 仍显示，方便在 Obsidian 里预览半成品 */
export async function getVisiblePosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 文件名 YYYY-MM-DD-slug.md → slug；frontmatter.slug 可覆盖 */
export function postSlug(post: BlogPost): string {
  if (post.data.slug) return post.data.slug;
  return post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
}

export function postHref(post: BlogPost): string {
  return `/posts/${postSlug(post)}/`;
}

/** YAML 日期是 UTC 午夜，用 UTC 格式化避免 Vercel 构建时差一天 */
export function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
