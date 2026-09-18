---
domain: writing
kind: moc
subtype: studio-hub
lifecycle: active
theme_ids: []
created_at: 2026-05-27
updated_at: 2026-05-31
tags:
  - writing
  - index
  - studio
---

# Writing-Studio

> 博客写作的**工具间**。主库是大脑（Obsidian CLI 只读），这里是手；成稿进 `content/posts/`。
>
> Studio 不是料场。短文可以在这里走完；长跑创作从一开始就住在 `posts/`，只引用这里的 prompt、style 和 workflow。

概念库、思考笔记在主库：`obsidian vault="Obsidian Vault" search query=...` / `read path=...`。不要把主库复制进 Blog。

---

## 快速入口

- [[writing-asset-standard|写作资产标准]] — 字段规范和分类边界
- [[writing-query-panel|Writing Query Panel]] — Dataview + Agent JSON 查询面板
- [[project-harness-guide|项目 Harness 化指导总纲]] — README 收缩和 harness 分层原则
- [[prompts/system/writing-harness|Writing Harness]] — AI 写作总控入口
- [[prompts/workflow/writing-contract|Writing Contract]] / [[prompts/workflow/stage-gates|Stage Gates]] / [[prompts/workflow/publish-gate|Publish Gate]] — 写作合同与质量门禁
- [[../../30-Resources/概念库/README|概念库]] — 只读概念透镜和主题地图，不复制进 Studio
- [[prompts/workflow/x-post|X Post Workflow]] — X/Twitter 短内容改写
- [[style/writing-style-profile|写作风格总画像]] — Ryan 文风分析总报告
- [[style/ryan-nonfiction-style|工程师文风]] / [[style/ryan-essayist-style|思想者文风]] — 可执行文风资产
- [[prompts/workflow/ai-assisted-writing-guide|AI 辅助写作指南]] — Harness 使用说明
- [[research/改写候选清单|旧文改写候选清单]] — 可重写选题池

## 给 AI 的读取顺序

1. 先读本页，确认 Studio 是工具间，不是所有文章的永久住所。
2. 再读 [[writing-asset-standard|写作资产标准]]，理解 `kind / subtype / writing_id / theme_ids / voice_id`。
3. 读取 [[prompts/system/writing-harness|Writing Harness]]，由 harness 判断阶段、写作合同和下一步 workflow。
4. 阶段切换或发布前，读取 [[prompts/workflow/stage-gates|Stage Gates]] / [[prompts/workflow/publish-gate|Publish Gate]]。
5. 如果需要索引资产、找草稿、查文风或查概念候选，读取 [[writing-query-panel|Writing Query Panel]]。
6. 如果任务需要概念、隐喻、主题地图或反论点，用 Obsidian CLI 读主库：`obsidian vault="Obsidian Vault" search` / `read`，不要把概念库复制进 Blog。
7. 如果是短文，优先查 `drafts/`、`prompts/`、`style/`、`research/`。
8. 如果是长跑创作，作品应住在目的地，只引用 Studio 的 prompt、style 和 workflow。
9. 改写前先找 `voice_id` 对应的风格资产，再找 `related_prompt_ids`、`related_workflow_ids`、`source_paths` 和 `writing_id` 相关资料。

## 模式判别

Studio 是上游工具间。短文可以在 Studio 内走完；长跑创作从一开始就住在目的地，只引用 Studio 的 prompt、style 和 workflow。

| 信号 | A | B |
|---|:-:|:-:|
| 一次写完 | ✓ |  |
| < 3000 字 | ✓ |  |
| 跨多周创作 |  | ✓ |
| 有大纲/角色/世界观 |  | ✓ |
| 想保留版本对比 |  | ✓ |

| 项目 | Pattern A | Pattern B |
|---|---|---|
| 草稿位置 | `content/Writing-Studio/drafts/<channel>/` | `content/posts/` 或 `content/posts/drafts/` |
| 研究位置 | `content/Writing-Studio/research/` | 作品目录内 |
| 完稿流向 | `content/posts/`（见光）或主库 50-Thinking / social | 留在 `posts/` |
| Studio 角色 | 写作生产线 | 工具引用层 |

详细执行顺序见 [[prompts/workflow/ai-assisted-writing-guide|AI 辅助写作指南]]。字段、目录、命名、完稿流向和 highlights 标准见 [[writing-asset-standard|写作资产标准]]。

---

## 维护节奏

- **每篇文章完稿后**：决定 highlights 留什么，把通用 prompt 提取到 `prompts/`
- **每月一次**：扫一遍 `drafts/`，停滞 > 1 个月的草稿要么继续要么归档
- **每季度**：整理 `prompts/`，去重相似的 prompt
