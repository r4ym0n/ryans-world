---
domain: writing
kind: workflow
subtype: contract
workflow_id: writing-contract
lifecycle: active
theme_ids: [writing-contract, writing-harness, editorial-control]
related_workflow_ids: [stage-gates, idea-to-outline, outline-to-draft, draft-to-rewrite, fact-check, publish-gate]
created_at: 2026-05-31
updated_at: 2026-05-31
tags:
  - writing
  - workflow
  - contract
---

# Writing Contract

## 用途

在正式写作前，把文章对读者的承诺、证据边界和完成标准写清楚。合同不替作者生成观点，只约束后续 workflow 不跑偏。

## 适用时机

- 新建 `writing_id` 时。
- 只有闪念、标题或片段，尚未形成文章工作台时。
- 文章反复改写后主命题变得模糊时。
- 准备从 `idea` 进入 `outlining`，或从 `outlining` 进入 `drafting` 前。

## 输入

- 原始想法或当前草稿。
- 目标渠道：`blog` / `thinking` / `x` / `xiaohongshu` / `newsletter`。
- 预期文风：`ryan-nonfiction` 或 `ryan-essayist`。
- 已有来源：知识卡、旧文、研究材料、外部链接。
- 可用概念透镜：来自 `30-Resources/概念库/` 的概念卡或概念枢纽。
- 作者不想写的方向。

## 输出模板

```markdown
## 写作合同

- `writing_id`：
- 目标读者：
- 发布渠道：
- 推荐文风：
- 当前阶段：
- 文章承诺：
- 一句话主命题：
- 反命题：
- 证据标准：
- 非目标：
- 风险边界：
- 相关概念透镜：
- 完成标准：

## 事实边界

- 已知事实：
- 作者判断：
- 待补证据：

## 下一步

- 推荐 workflow：
- 进入条件是否满足：
- 阻塞项：
```

## 规则

- 合同缺失时，不直接写最终稿。
- `文章承诺` 要写成读者读完后获得什么，而不是作者想表达什么。
- `一句话主命题` 只能有一个核心判断。
- `反命题` 必须能真正挑战主命题，不能只是礼貌性补充。
- `证据标准` 要说明哪些判断需要来源，哪些可以作为作者经验或观点保留。
- `非目标` 用来挡住跑题：哪些角度本篇明确不展开。
- `相关概念透镜` 只记录本篇借用的概念、隐喻或张力，不能替代事实来源。
- 涉及投资时，完成标准不能包含买卖建议，只能包含研究方向、验证指标或风险框架。
- 涉及外部事实、历史数据、公司数据时，没有来源就写入 `待补证据` 或降级为作者判断。
