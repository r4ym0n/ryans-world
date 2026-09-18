---
domain: writing
kind: moc
subtype: query-panel
lifecycle: active
theme_ids: [writing-harness, writing-assets, query-panel]
created_at: 2026-05-31
updated_at: 2026-05-31
tags:
  - writing
  - index
  - query
---

# Writing Query Panel

> 每个面板先给人看的 Dataview，再给 Agent 用的 DQL JSON。查询语义统一写成 DQL；Agent CLI 只负责执行同一类 DQL，不再手写 `pages().where().map()`。

Agent 前置检查：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code="app.vault.getName()"
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code="Object.keys(app.plugins.plugins).includes('dataview')"
```

CLI 不可用时，Agent 退回到直接解析 Markdown frontmatter。

Agent JSON 约定：

- `dataview` 块用于 Obsidian 内阅读。
- `Agent CLI JSON` 使用 `dataview.api.query(DQL)`，返回 `{ successful, value }`。
- `TABLE WITHOUT ID` 用来避免 Dataview 自动追加 `File` 列；需要文件路径时在 DQL 中显式选择 `file.link` 或 `file.path`。
- 带占位符的查询先替换 `example-slug` / `ryan-nonfiction`，再执行。

## 写作资产 · 按类型统计

Dataview：

```dataview
TABLE WITHOUT ID
  key as "类型",
  length(rows) as "数量"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing"
GROUP BY kind
SORT key ASC
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  key as "类型",
  length(rows) as "数量"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing"
GROUP BY kind
SORT key ASC`), null, 2))()'
```

## 写作资产 · 最近更新

Dataview：

```dataview
TABLE WITHOUT ID
  file.link as "笔记",
  kind as "类型",
  subtype as "子类",
  writing_id as "文章主键",
  voice_id as "文风",
  stage as "阶段",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing"
SORT updated_at DESC
LIMIT 30
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  kind,
  subtype,
  writing_id,
  voice_id,
  stage,
  updated_at
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing"
SORT updated_at DESC
LIMIT 30`), null, 2))()'
```

## 写作资产 · 按文章主键

Dataview（把 `example-slug` 换成目标 `writing_id`）：

```dataview
TABLE WITHOUT ID
  file.link as "笔记",
  kind as "类型",
  subtype as "子类",
  stage as "阶段",
  voice_id as "文风",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND writing_id = "example-slug"
SORT updated_at DESC
```

Agent CLI JSON（把 `example-slug` 换成目标 `writing_id`）：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  kind,
  subtype,
  stage,
  voice_id,
  updated_at
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND writing_id = "example-slug"
SORT updated_at DESC`), null, 2))()'
```

## 写作资产 · 按文风

Dataview（把 `ryan-nonfiction` 换成目标 `voice_id`）：

```dataview
TABLE WITHOUT ID
  file.link as "资产",
  kind as "类型",
  subtype as "子类",
  writing_id as "文章主键",
  stage as "阶段",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND (
  voice_id = "ryan-nonfiction" OR contains(voice_id, "ryan-nonfiction")
)
SORT updated_at DESC
```

Agent CLI JSON（把 `ryan-nonfiction` 换成目标 `voice_id`）：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  kind,
  subtype,
  writing_id,
  stage,
  updated_at
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND (
  voice_id = "ryan-nonfiction" OR contains(voice_id, "ryan-nonfiction")
)
SORT updated_at DESC`), null, 2))()'
```

## 草稿

Dataview：

```dataview
TABLE WITHOUT ID
  file.link as "草稿",
  subtype as "类型",
  writing_id as "文章主键",
  theme_ids as "主题",
  channel as "渠道",
  stage as "阶段",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio/drafts"
WHERE domain = "writing" AND kind = "draft"
SORT updated_at DESC
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  subtype,
  writing_id,
  theme_ids,
  channel,
  stage,
  updated_at
FROM "10-Projects/Writing-Studio/drafts"
WHERE domain = "writing" AND kind = "draft"
SORT updated_at DESC`), null, 2))()'
```

## Prompt / Workflow / Style

Dataview：

```dataview
TABLE WITHOUT ID
  file.link as "资产",
  kind as "类型",
  subtype as "子类",
  prompt_id as "Prompt ID",
  workflow_id as "Workflow ID",
  style_id as "Style ID",
  voice_id as "文风",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND contains(["prompt", "workflow", "style"], kind)
SORT kind ASC, updated_at DESC
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  kind,
  subtype,
  prompt_id,
  workflow_id,
  style_id,
  voice_id,
  updated_at
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND contains(["prompt", "workflow", "style"], kind)
SORT kind ASC, updated_at DESC`), null, 2))()'
```

## Harness 资产

Dataview：

```dataview
TABLE WITHOUT ID
  file.link as "资产",
  kind as "类型",
  subtype as "子类",
  prompt_id as "Prompt ID",
  workflow_id as "Workflow ID",
  style_id as "Style ID",
  voice_id as "文风",
  updated_at as "更新日期"
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND (
  contains(["prompt", "workflow", "style"], kind)
)
SORT kind ASC, subtype ASC, file.name ASC
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  kind,
  subtype,
  prompt_id,
  workflow_id,
  style_id,
  voice_id,
  updated_at
FROM "10-Projects/Writing-Studio"
WHERE domain = "writing" AND contains(["prompt", "workflow", "style"], kind)
SORT kind ASC, subtype ASC, file.name ASC`), null, 2))()'
```

## 概念库 · 概念透镜

Dataview：

```dataview
TABLE WITHOUT ID
  file.link as "概念",
  domain as "领域",
  kind as "类型",
  subtype as "子类",
  concept_id as "Concept ID",
  cluster_id as "集群",
  topic_ids as "主题",
  updated_at as "更新日期"
FROM "30-Resources/概念库"
WHERE kind = "concept" OR subtype = "concept-hub" OR subtype = "cluster-hub"
SORT cluster_id ASC, concept_id ASC, file.name ASC
```

Agent CLI JSON：

```bash
/Applications/Obsiooo.app/Contents/MacOS/obsidian-cli eval code='(async()=>JSON.stringify(await app.plugins.plugins.dataview.api.query(`TABLE WITHOUT ID
  file.path as path,
  domain,
  kind,
  subtype,
  concept_id,
  cluster_id,
  topic_ids,
  updated_at
FROM "30-Resources/概念库"
WHERE kind = "concept" OR subtype = "concept-hub" OR subtype = "cluster-hub"
SORT cluster_id ASC, concept_id ASC, file.name ASC`), null, 2))()'
```

概念库使用规则：

- 概念库是只读知识上下文，不是 Studio 资产，不复制进 `drafts/` 或 `research/`。
- 概念卡提供“概念透镜、隐喻、张力、反论点”，不能直接当事实来源。
- 选中的概念卡路径写入草稿 `source_paths`，方便后续 fact-check 和改写回查。
- 涉及投资时，继续遵守只给研究方向和验证指标、不写买卖建议的边界。
