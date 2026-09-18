---
title: 草稿示例（不会发布）
date: 2026-09-18
description: "这是一篇草稿，演示 drafts/ 文件夹的效果——构建时被跳过，只在本地 dev 可见。"
tags: [示例]
---

放在 `drafts/` 里的文章默认是草稿：

- **不会**出现在线上
- **会**出现在本地 `npm run dev` 的预览中（标题旁有「草稿」标记）

写完后把文件移出 `drafts/`，再 `vercel --prod` 即为发布。也可以继续用 frontmatter 里的 `draft: true`。
