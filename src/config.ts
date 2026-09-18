export const themes = ['plain', 'brutal', 'signal'] as const;
export type SiteTheme = (typeof themes)[number];

export const themeMeta: Record<
  SiteTheme,
  { label: string; colorLight: string; colorDark: string; webfont?: string }
> = {
  plain: {
    label: '蓝白极简',
    colorLight: '#ffffff',
    colorDark: '#17181c',
  },
  brutal: {
    label: 'Brutal',
    colorLight: '#fff6d8',
    colorDark: '#121212',
    webfont: 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&display=swap',
  },
  signal: {
    label: '红蓝工业',
    colorLight: '#eef1f4',
    colorDark: '#101318',
    webfont:
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
  },
};

// 站点配置：改博客名、简介、导航、主题、评论，都只动这个文件
export const site = {
  title: '瑞安的世界',
  description: 'Ryan 的博客：投资、区块链、能源与长期思考',
  lang: 'zh-CN',
  author: 'Ryan',
  /** 外观：plain 蓝白极简 · brutal 克制新粗野 · signal 红蓝工业。改这一行即可切换。 */
  theme: 'signal' as SiteTheme,
  nav: [
    { text: '首页', href: '/' },
    { text: '标签', href: '/tags/' },
    { text: '关于', href: '/about/' },
    { text: 'RSS', href: '/rss.xml' },
  ],
  // Giscus 评论（可选，默认关闭）：
  // 仓库推送到 GitHub 后，到 https://giscus.app 生成配置并填到这里，
  // 把 enabled 改为 true，评论框即出现在每篇文章底部
  giscus: {
    enabled: false,
    repo: 'YOUR_NAME/YOUR_REPO',
    repoId: 'YOUR_REPO_ID',
    category: 'Announcements',
    categoryId: 'YOUR_CATEGORY_ID',
    mapping: 'og:title',
    lang: 'zh-CN',
  },
};
