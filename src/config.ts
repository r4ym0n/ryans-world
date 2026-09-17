// 站点配置：改博客名、简介、导航、评论，都只动这个文件
export const site = {
  title: '瑞安的世界',
  description: 'Ryan 的博客：投资、区块链、能源与长期思考',
  lang: 'zh-CN',
  author: 'Ryan',
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
