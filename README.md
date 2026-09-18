# 瑞安的世界

Obsidian 写作、Astro 生成、Vercel 发布的个人博客。

## 分工

- **主 vault（iCloud）**：私有笔记，不进这个仓库
- **这个仓库**：站点代码 + `posts/` 里要公开的 Markdown
- **Vercel**：用本地 CLI 发布；GitHub 仓库已连接，push 也会自动部署

写作入口是 Obsidian，把这个文件夹当成第二个 vault 打开即可。不要把 `node_modules/` 或 `dist/` 放进 iCloud 主库。

## 写文章

1. 在 `posts/` 新建 `YYYY-MM-DD-english-slug.md`
2. 填 frontmatter：

```yaml
---
title: 标题
date: 2026-09-18
description: 一两句摘要（可选）
tags: [标签]
draft: true
---
```

3. 没写完就留 `draft: true`：本地 `npm run dev` 看得到，线上构建会被跳过
4. 要发布：删掉 `draft`（或改成 `false`），在本目录执行 `vercel --prod`

进 `posts/` 的才见光。正文用普通 Markdown；Obsidian 双向链接、Dataview 不会按笔记软件那样渲染。

## 本地预览

```sh
npm install
npm run dev
```

生产构建：

```sh
npm run build
npm run preview
```

## 发布

CLI 全局安装一次并登录：

```sh
npm install -g vercel
vercel login
```

之后在这个目录：

```sh
vercel --prod
```

项目已链接到 Vercel 的 `ryans-world`。站点名、简介、导航、Giscus 评论都在 `src/config.ts`。自定义域名后改 `astro.config.mjs` 里的 `site`。
