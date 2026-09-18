---
domain: writing
kind: workflow
subtype: quality-gate
workflow_id: stage-gates
lifecycle: active
theme_ids: [stage-gate, writing-harness, editorial-control]
related_workflow_ids: [writing-contract, idea-to-outline, outline-to-draft, draft-to-rewrite, fact-check, final-polish, publish-gate]
created_at: 2026-05-31
updated_at: 2026-05-31
tags:
  - writing
  - workflow
  - quality-gate
---

# Stage Gates

## 用途

把 `stage` 从普通标签变成可检查的状态机。每次推进阶段前，先检查进入条件、退出条件和阻塞项。

## 阶段定义

| 阶段 | 目标 | 允许改什么 | 不允许改什么 |
|---|---|---|---|
| `idea` | 捕捉问题和方向 | 命题、读者、素材候选 | 直接定稿 |
| `researching` | 补来源和证据 | source_paths、事实清单、案例 | 把未经核实内容写成事实 |
| `outlining` | 建文章骨架 | 主线、章节顺序、反论点 | 大段润色 |
| `drafting` | 写第一版完整草稿 | 正文、例子、过渡 | 偷换主命题 |
| `revising` | 改结构、论证和文风 | 段落顺序、节奏、表达 | 擅自新增无来源事实 |
| `ready` | 发布前校验 | 事实边界、标题、开头、结尾 | 重新发明文章 |
| `published` | 留存发布记录 | 发布链接、复盘备注 | 修改已发布事实记录 |

## 阶段门禁

### `idea` -> `outlining`

进入 `outlining` 前必须满足：

- 有 `writing_id` 或明确需要创建。
- 已完成 [[writing-contract]] 的最小字段：目标读者、文章承诺、主命题、反命题、证据标准。
- 已选择 Pattern A 或 Pattern B。
- 已选择推荐文风，或明确写入 `待确认文风`。

阻塞项：

- 主命题超过一个。
- 读者不清楚。
- 缺少真正的反命题。

### `outlining` -> `drafting`

进入 `drafting` 前必须满足：

- 有文章结构草案。
- 每个强判断至少对应一种支撑：事实、案例、作者经验、类比或待补证据。
- 反论点已被保留进结构。
- 涉及外部事实的段落已标记来源或 `待补数据`。

阻塞项：

- 结构只有标题，没有论证链。
- 把 `待补数据` 当成确定事实。
- 文风和文章目标不匹配。

### `drafting` -> `revising`

进入 `revising` 前必须满足：

- 有完整初稿。
- 初稿保留了主命题、主隐喻和反论点。
- 已附自检：最弱论点、最缺证据、最像 AI 口吻的段落。

阻塞项：

- 初稿缺结尾。
- 核心命题在正文里变了。
- 出现未标注的外部事实或数字。

### `revising` -> `ready`

进入 `ready` 前必须满足：

- 结构、论证、文风已完成一轮改写。
- 没有明显 AI 味空话。
- 所有 `待补数据` 都被保留为待处理项，不能悄悄删除。
- 已准备运行 [[fact-check]]。

阻塞项：

- 仍在大幅重写核心观点。
- 反论点被删掉。
- 风格规则和文章骨架冲突。

### `ready` -> `published`

进入 `published` 前必须满足：

- 通过 [[publish-gate]]。
- `updated_at` 已更新。
- Pattern A 已准备移动到发布目的地；Pattern B 仍留在作品目录。
- 如有发布记录，记录 `published_url` 或发布位置。

阻塞项：

- 仍存在未解决事实问题。
- 投资内容含有直接买卖建议。
- 发布渠道与正文格式不匹配。

## 输出模板

```markdown
## Stage Gate

- 当前阶段：
- 目标阶段：
- 是否通过：

## 检查结果

| 项目 | 结果 | 说明 |
|---|---|---|

## 阻塞项

## 允许进入的下一步 workflow
```

