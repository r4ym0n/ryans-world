# 瑞安的世界

Obsidian 写作、Astro 生成、Vercel 发布的个人博客。

## 两极

只保留两套系统。

1. **主库（大脑）**  
   iCloud `Obsidian Vault`  
   思考、日记、概念库、项目。写作 agent 用 Obsidian CLI **只读**这里，不把主库复制进 Git。

   ```sh
   obsidian vault="Obsidian Vault" search query="..."
   obsidian vault="Obsidian Vault" read path="30-Resources/概念库/README.md"
   ```

2. **Blog（手和嘴）**  
   `/Users/ryan/qspace/RMS/blog`  
   打开 `content/` 当第二个 Obsidian vault。

```text
content/
  Writing-Studio/   工具间：文风、prompt、改写、未成型草稿。不上网
  posts/            对外。Astro 只读这里
    YYYY-MM-DD-slug.md
    drafts/         已有 title/date、准备见光的半成品
src/                站点代码，不要当 vault
```

GitHub：`r4ym0n/ryans-world`。发布：`vercel --prod`。

主库里的 `10-Projects/Writing-Studio` 已拷到这里，确认无误后可以删掉主库那份，避免两套工具间。主库里的 `95-Blog`、`10-Projects/Blog` 是旧站点残件，不要再写。

## 写文章

长跑创作直接住在 `content/posts/`，文件名 `YYYY-MM-DD-slug.md`（没写完放 `posts/drafts/`）。短平快可以先在 `Writing-Studio/drafts/` 走完，定稿再移进 `posts/`。

```yaml
---
title: 标题
date: 2026-09-18
description: 一两句摘要（可选）
tags: [标签]
---
```

`posts/drafts/` 里的文件，或 `draft: true`，本地 `npm run dev` 看得到，线上没有。

外观在 `src/config.ts` 的 `theme`：`plain` 蓝白极简，`brutal` 克制新粗野，`signal` 红蓝工业。改那一行后刷新即可，没有前台开关。

## 本地预览

```sh
npm install
npm run lint
npm run dev
npm run build
```

`npm run lint` 查写作约定（扁平文件名、frontmatter、slug）。缺字段这类事 `astro build` 自己会报，不必再占 `check` 这个名字。

搜索用 Pagefind：构建时索引正文，浏览器里搜。本地要先 `npm run build` 一次，dev 才会有索引。
