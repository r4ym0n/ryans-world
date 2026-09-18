---
domain: writing
kind: workflow
subtype: publish
workflow_id: publish-gate
lifecycle: active
theme_ids: [publish-gate, writing-harness, editorial-control]
related_workflow_ids: [writing-contract, stage-gates, fact-check, final-polish]
created_at: 2026-05-31
updated_at: 2026-05-31
tags:
  - writing
  - workflow
  - quality-gate
---

# Publish Gate

## 用途

发布前最后一道质量门禁。它不负责润色全文，而是判断文章能不能进入 [[final-polish]] 或发布。

## 前置条件

- 当前 `stage` 是 `ready`。
- 已运行或准备运行 [[fact-check]]。
- 已有明确发布渠道。
- 已选择 Pattern A 或 Pattern B 的存放策略。

## 必查项

| 类别 | 必须通过 |
|---|---|
| 元数据 | `domain`、`kind`、`subtype`、`lifecycle`、`theme_ids`、`writing_id`、`stage`、`voice_id`、`updated_at` 完整 |
| 事实 | 没有未解决的 `待补数据`；外部事实有来源或已降级表达 |
| 观点 | 主命题清晰；反论点保留；没有把作者判断伪装成事实 |
| 投资边界 | 只输出研究方向、验证指标和风险框架；不写荐股结论 |
| 文风 | 标题、开头、结尾符合所选 `voice_id` |
| 正文格式 | 独立长文从 `#` 文章标题开始；主章节用 `##`；工具资产示例不受正文格式强制 |
| 发布位置 | Pattern A 准备流向 Blog / 50-Thinking / social；Pattern B 留在作品目录 |

## 输出模板

```markdown
## Publish Gate

- 是否通过：
- 推荐下一步：

## 通过项

## 阻塞项

## 需要降级的表达

## 发布前最后修改
```

## 规则

- 只要存在未解决事实问题，就不要输出最终润色版，先列阻塞项。
- 如果事实来源不足但文章可以作为观点保留，必须明确降级表达。
- 如果发布渠道是 X / 社交媒体，传播性不能压过事实边界。
- 如果文章是投资相关内容，发布门禁优先检查是否越过研究边界。

