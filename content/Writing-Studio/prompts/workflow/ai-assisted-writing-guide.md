---
domain: writing
kind: workflow
subtype: guide
workflow_id: ai-assisted-writing-guide
lifecycle: active
theme_ids: [ai-assisted-writing, writing-harness, style-transfer]
related_prompt_ids: [writing-harness, ryan-nonfiction-voice, ryan-essayist-voice]
related_workflow_ids: [writing-contract, stage-gates, idea-to-outline, outline-to-draft, draft-to-rewrite, subtemplate-d-plus, x-post, fact-check, publish-gate, final-polish]
related_style_ids: [ryan-nonfiction-style, ryan-essayist-style]
created_at: 2026-05-24
updated_at: 2026-05-31
tags:
  - writing
  - workflow
  - ai-writing
---

# AI Assisted Writing Guide

> 这不是 prompt 仓库，而是 Writing Harness 的使用说明。旧版大段 prompt 已拆到 `prompts/voice/` 和 `prompts/workflow/`。

## 先选模式

| 模式 | 使用条件 | 草稿位置 |
|---|---|---|
| Pattern A | 一次/两次能写完，短于 3000 字，无复杂世界观 | `10-Projects/Writing-Studio/drafts/` |
| Pattern B | 跨多周、多章节、有研究/版本/世界观 | 作品目的地，Studio 只提供工具引用 |

## 再选文风

| 文风 | `voice_id` | 用途 | 入口 |
|---|---|---|---|
| 工程师文风 | `ryan-nonfiction` | 博客随笔、投资评论、技术思考、操作复盘 | [[../voice/ryan-nonfiction]] |
| 思想者文风 | `ryan-essayist` | 压舱石长文、技术哲学、大历史类比 | [[../voice/ryan-essayist]] |

## 推荐流程

1. 合同阶段：用 [[writing-contract]] 明确读者、承诺、主命题、反命题、证据标准和完成标准。
2. 闪念阶段：用 [[idea-to-outline]] 建工作台。
3. 大纲阶段：补命题、结构、反论点、待补证据。
4. 阶段切换：用 [[stage-gates]] 检查是否能进入下一阶段。
5. 初稿阶段：用 [[outline-to-draft]] 写第一版。
6. 改写阶段：用 [[draft-to-rewrite]] 做结构和文风升级。
7. 代表作级工程师长文：叠加 [[subtemplate-d-plus]]。
8. X/Twitter 短内容：用 [[x-post]] 先做 hook、压缩和 CTA，再决定是否展开 thread。
9. 校验阶段：用 [[fact-check]] 标出事实问题。
10. 发布门禁：用 [[publish-gate]] 判断是否可以进入最后润色。
11. 定稿阶段：用 [[final-polish]] 清理口吻和发布风险。

## 完整生产线

```text
想法 -> writing-contract -> idea-to-outline -> stage-gates -> draft/rewrite
                                                        |
                                                        +-> fact-check -> publish-gate -> final-polish
                                                        |
                                                        +-> 10-Projects/Blog/draft/    (博客)
                                                        +-> 50-Thinking/<topic>/        (essay/观点)
                                                        +-> social channel              (X / 小红书)

                          途中精彩的 prompt/对话 -> highlights/
```

这张图只描述执行顺序。字段规范、目录归位和完稿后流向以 [[../../writing-asset-standard|写作资产标准]] 为准。

## 使用规则

- 不要把“写初稿”和“事实检查”混在同一轮。
- 不要把“风格模仿”和“观点生成”混在同一层；观点来自草稿和知识卡，风格来自 style/voice。
- 每篇文章必须有 `writing_id`，否则后续 research、draft、published 无法聚合。
- 重要文章保留 `source_paths`，让 AI 能回到知识卡和研究材料。
- 合同不完整时，不直接进入全文写作；门禁未通过时，不进入下一阶段。
