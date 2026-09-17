---
title: 草稿示例（不会发布）
date: 2026-09-18
description: "这是一篇草稿，演示 draft: true 的效果——构建时被跳过，只在本地 dev 可见。"
tags: [示例]
draft: true
---

在 frontmatter 里写 `draft: true`，这篇文章就：

- **不会**出现在线上构建结果里
- **会**出现在本地 `npm run dev` 的预览中（标题旁有"草稿"标记）

所以你可以放心在 Obsidian 里写半成品，写完把 `draft: true` 删掉（或改为 `false`），推送后即为发布。
