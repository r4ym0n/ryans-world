import rss from '@astrojs/rss';
import { site } from '../config';
import { getPublishedPosts, postHref } from '../lib/posts';

export async function GET(context: { site?: URL }) {
  const posts = await getPublishedPosts();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: postHref(post),
      categories: post.data.tags,
    })),
  });
}
