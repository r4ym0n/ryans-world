---
domain: writing
kind: moc
subtype: standard
lifecycle: active
theme_ids: []
created_at: 2026-05-27
updated_at: 2026-05-31
aliases:
  - 写作资产分类标准
  - 写作资产标准
tags:
  - writing
  - standard
  - metadata
---

# 写作资产标准

> 目标：把草稿、研究、prompt、文风、工作流和发布记录统一到一个可查询的写作资产层。目录只负责存放，聚合依赖 frontmatter 和 Dataview。

## 正式命名

| 资产 | `kind` | 常见 `subtype` | 主住所 |
|---|---|---|---|
| 草稿 | `draft` | `blog` / `thinking` / `social` / `sample` | `drafts/` 或作品目的地 |
| 文章研究 | `research` | `source-pack` / `outline-notes` / `rewrite-candidates` | `research/` 或作品目录内 |
| Harness / Prompt | `prompt` | `system` / `voice` / `task` | `prompts/` |
| 文风资产 | `style` | `style-profile` / `example` / `avoid-list` | `style/` |
| 工作流 | `workflow` | `guide` / `contract` / `outline` / `draft` / `rewrite` / `social-post` / `fact-check` / `polish` / `quality-gate` / `publish` | `prompts/workflow/` |
| AI 高亮信息 | `highlight` | `conversation` / `structure` / `caveat` | `highlights/` |
| 发布记录 | `published` | `blog` / `thinking` / `social` | 发布目的地或索引页 |
| 索引页 | `moc` | `studio-hub` / `standard` / `query-panel` / `project-guide` / `topic-hub` | 视主题而定 |

## 目录说明

| 目录 | 放什么 | 不放什么 |
|---|---|---|
| `prompts/system/` | Harness 和专项系统提示词 | 具体文风规则全集 |
| `prompts/voice/` | 不同文风的可执行 prompt | 内容主题 |
| `prompts/workflow/` | 多步工作流（如 contract -> outline -> draft -> gate -> fact-check） | 文风画像 |
| `style/` | 稳定文风资产、风格画像、避免的写法 | 一次性分析过程 |
| `style-analysis/` | 风格审计和样本分析过程 | 可复用 prompt / 稳定风格资产 |
| `drafts/blog/` | 博客文章草稿 | 思考型 essay |
| `drafts/thinking/` | Essay / 观点草稿 | 博客文章 |
| `drafts/social/` | 推文 / 小红书草稿 | 长文 |
| `research/<slug>/` | 写某篇文章时找的资料、链接 | 通用资料（那是 30-Resources） |
| `highlights/` | 值得保留的 AI 对话 / 精彩 prompt 响应 | 普通对话 |

## 核心字段

所有写作相关资产至少保留下面这组字段：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `domain` | string | 是 | 固定为 `writing` |
| `kind` | string | 是 | `draft` / `research` / `prompt` / `style` / `workflow` / `highlight` / `published` / `moc` |
| `subtype` | string | 是 | 同一 `kind` 下的更细角色 |
| `lifecycle` | string | 是 | `draft` / `active` / `paused` / `published` / `archived` |
| `theme_ids` | array | 是 | 主题聚合键。例：`[knowledge-management]`、`[technical-writing]` |
| `writing_id` | string | 否 | 单篇文章主键。草稿、研究、发布记录靠它聚合 |
| `channel` | string | 否 | `blog` / `thinking` / `x` / `xiaohongshu` / `newsletter` |
| `stage` | string | 否 | `idea` / `researching` / `outlining` / `drafting` / `revising` / `ready` / `published` |
| `voice_id` | string | 否 | 文风 ID。例：`ryan-nonfiction`、`ryan-essayist` |
| `related_prompt_ids` | array | 否 | 使用的 prompt ID |
| `related_workflow_ids` | array | 否 | 使用的 workflow ID |
| `related_style_ids` | array | 否 | 使用的 style ID |
| `source_paths` | array | 否 | 来源文件路径、旧文路径、知识卡或概念库路径 |
| `created_at` | date | 是 | 创建日期，`YYYY-MM-DD` |
| `updated_at` | date | 是 | 最近维护日期，`YYYY-MM-DD` |
| `tags` | array | 否 | Obsidian 检索辅助，不作为主聚合键 |

## 各类型推荐字段

### `draft`

```yaml
domain: writing
kind: draft
subtype: blog
lifecycle: draft
writing_id: para-chaos
theme_ids: [knowledge-management, workflow]
channel: blog
stage: drafting
audience: builders
voice_id: ryan-nonfiction
related_prompt_ids: [ryan-nonfiction-voice]
related_workflow_ids: [outline-to-draft]
related_style_ids: [ryan-nonfiction-style]
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `research`

```yaml
domain: writing
kind: research
subtype: source-pack
lifecycle: active
writing_id: para-chaos
theme_ids: [knowledge-management]
source_paths: []
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `prompt`

```yaml
domain: writing
kind: prompt
subtype: system
prompt_id: writing-harness
lifecycle: active
theme_ids: [writing-harness, ai-assisted-writing]
voice_id: neutral-harness
use_cases: [writing-orchestration, style-selection]
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `style`

```yaml
domain: writing
kind: style
subtype: style-profile
style_id: ryan-nonfiction-style
lifecycle: active
theme_ids: [nonfiction, essay, investing-writing]
voice_id: ryan-nonfiction
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `workflow`

```yaml
domain: writing
kind: workflow
subtype: rewrite
workflow_id: longform-rewrite
lifecycle: active
theme_ids: [rewrite, longform]
voice_id: ryan-nonfiction
related_prompt_ids: []
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `highlight`

```yaml
domain: writing
kind: highlight
subtype: conversation
lifecycle: active
theme_ids: [prompting]
writing_id: optional-article-id
source_model: gpt
created_at: 2026-05-27
updated_at: 2026-05-27
```

### `published`

```yaml
domain: writing
kind: published
subtype: blog
lifecycle: published
writing_id: para-chaos
theme_ids: [knowledge-management]
channel: blog
published_url: https://example.com/post
published_at: 2026-05-27
created_at: 2026-05-27
updated_at: 2026-05-27
```

## 命名约定

- `kind` 和字段名一律用英文 `snake_case`。
- `writing_id` / `theme_ids` / `voice_id` / `prompt_id` / `workflow_id` 一律用 ASCII slug。
- 标题可以保留中文，但 ID 不要用中文。
- `theme_ids` / `related_prompt_ids` / `related_style_ids` 即使只有一个值，也保持数组。
- 不再新增 `type` / `status` / `date` / `topic` 这类旧字段；老文件触碰时迁移。

## 文件命名

- 草稿文件：`YYYY-MM-DD-<slug>.md`，例：`2026-05-23-为什么 PARA 失控.md`。
- Prompt / workflow 文件：优先用动词或用途命名，例：`idea-to-outline.md`、`draft-to-rewrite.md`。
- Highlight 文件：`YYYY-MM-DD-<topic>.md`，保留对话时建议用 frontmatter 标 `source_model`。

## 完稿后流向

| 草稿位置 | 完稿后移到 | 操作 |
|---|---|---|
| `drafts/blog/<slug>.md` | `10-Projects/Blog/draft/<slug>.md` | mv；Blog 自己的发布流程处理后续 |
| `drafts/thinking/<slug>.md` | `50-Thinking/<topic>/<title>.md` | mv 并重命名为正式标题 |
| `drafts/social/<slug>.md` | `20-Areas/SocialMedia/<channel>/` 或 `40-Archive/` | 看发布后是否仍有复用价值 |

## 保留 AI 对话的标准

不是每次对话都保留。值得进入 `highlights/` 的情况：

- 找到一个特别有效的 prompt，应提炼到 `prompts/system/` 或 `prompts/voice/`。
- AI 给出没想到的视角、类比或反论点，可以整段保留。
- 多轮迭代出稳定结构，应归纳成 workflow，放入 `prompts/workflow/`。
- 意外的 hallucination 教训，应保留作反例，文件名前缀 `_caveat-`。

## 正文格式约定

- 独立文章正文，包括 `kind: draft` 和 `kind: published` 的长文成稿，Markdown 标题层级从 `#` 文章标题开始。
- 副标题用斜体正文，不占标题层级。例：`*信息时代的反向驯化*`。
- 正文主章节用 `##`，小节用 `###`；不要无故跳级到 `####` 或更深。
- Prompt、workflow、style 等工具资产里的示例模板不受本条强制约束，按各自文件用途组织。

## 聚合原则

- 写作资产不靠目录清单维护，优先用 Dataview 聚合。
- 单篇文章的所有上下文优先靠 `writing_id` 聚合。
- 主题级浏览靠 `theme_ids`，不是靠标题关键词。
- 文风、prompt 和 workflow 是独立资产，通过 `voice_id`、`prompt_id`、`workflow_id`、`related_prompt_ids`、`related_workflow_ids` 连接。
- AI 写作任务优先从 `prompts/system/writing-harness.md` 进入，由 harness 选择 voice 和 workflow。
- 长跑创作的正文和研究应住在作品目的地，Studio 只提供工具引用。

## 迁移规则

1. 新建写作资产一律使用新字段。
2. 老笔记不做一次性大迁移，采用“触碰即升级”。
3. 旧字段到新字段的映射如下：

| 旧字段 | 新字段 |
|---|---|
| `type` | `kind` 或 `subtype` |
| `status` | `lifecycle` |
| `date` / `updated` | `created_at` / `updated_at` |
| `topic` | `theme_ids` |
| `配套文件` | `related_style_ids` 或正文链接 |
| `note` | 正文说明 |
