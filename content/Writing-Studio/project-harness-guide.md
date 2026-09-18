---
domain: writing
kind: moc
subtype: project-guide
lifecycle: draft
theme_ids: [writing-harness, harnessization, editorial-system]
related_prompt_ids: [writing-harness]
related_workflow_ids: [writing-contract, stage-gates, publish-gate, ai-assisted-writing-guide]
related_style_ids: []
created_at: 2026-05-31
updated_at: 2026-05-31
tags:
  - writing
  - guide
  - harness
---

# 项目 Harness 化指导总纲

> 目标：把一个项目从“文件集合”升级成“可被人和 Agent 稳定调用的生产系统”。  
> 本文是迁移 README 前的设计总纲，先用于审阅，不急着替换现有结构。

## 一句话定义

项目 harness 化，就是给项目建立一套稳定的运行外壳：

- README 负责路由。
- 标准文件负责数据模型。
- Harness 负责运行时调度。
- Workflow 负责具体执行。
- Contract 负责约束目标。
- Gates 负责阶段准入和发布阻断。
- Query panel 负责人类和 Agent 的共同检索视图。

最终结果不是“文档更多”，而是项目里的每个文件都知道自己属于什么、被谁读取、在什么时候被使用、输出要过哪道门。

## 适用对象

适合 harness 化的项目通常有这些特征：

- 文件数量会持续增长。
- 有多类资产：草稿、资料、prompt、workflow、style、发布记录、概念卡。
- 需要 Agent 反复协作，而不是偶尔问答。
- 有明确生命周期：idea -> draft -> revise -> ready -> published。
- 需要质量门禁：事实、风格、发布边界、迁移规则。

不适合 harness 化的项目：

- 一次性小任务。
- 只有几份静态资料。
- 没有反复调用的 workflow。
- 不需要 Agent 参与执行。

## 核心原则

### 1. README 只做路由

README 的职责是让人和 Agent 在最短路径内知道：

- 这个项目是什么。
- 先读什么。
- 关键入口在哪里。
- 什么内容不应该放在这里。

README 不应该长期承载：

- 大段查询命令。
- 详细执行流程。
- 长篇规范。
- 具体 prompt。
- 可迁移到 workflow 的操作步骤。

如果 README 变成操作手册，说明项目需要拆层。

### 2. 标准文件定义资产，不执行任务

资产标准文件负责回答：

- 有哪些 `kind` / `subtype`。
- frontmatter 必填字段是什么。
- 文件应该放在哪里。
- 如何聚合。
- 老字段如何迁移。

它不负责回答“这篇文章怎么写”“下一步怎么做”。这些属于 contract / workflow / gates。

### 3. Harness 是调度器，不是万能 prompt

Harness 的职责是：

- 判断当前阶段。
- 选择应该读取的资产。
- 选择下一步 workflow。
- 判断是否需要 contract / gate。
- 标明事实、观点、概念透镜和待补证据。

Harness 不应该塞进所有文风细节、所有查询命令、所有工作流步骤。它只保留足够调度的信息。

### 4. Workflow 承担可执行过程

凡是“按步骤做事”的内容，都应该进入 workflow：

- idea -> outline
- outline -> draft
- draft -> rewrite
- fact-check
- final-polish
- social-post
- query-panel 使用说明
- README 迁移流程

Workflow 应该有输入、输出、规则和停止条件。

### 5. Contract 约束单件产物

Contract 回答“这一件东西要成为什么”：

- 目标读者。
- 文章承诺。
- 主命题。
- 反命题。
- 证据标准。
- 非目标。
- 完成标准。

Contract 不替代资产标准。资产标准管系统，contract 管单件作品。

### 6. Gates 是阻断机制

Gate 不是建议清单，而是阶段推进条件。

一个 gate 至少要定义：

- 当前阶段。
- 目标阶段。
- 进入条件。
- 退出条件。
- 阻塞项。
- 失败后应该回到哪个 workflow。

没有阻断能力的 gate，只是 checklist。

### 7. Query panel 是共享视图

人看 Dataview，Agent 用 CLI JSON。两者应该放在同一小节：

```markdown
### 查询主题

Dataview：
...

Agent JSON：
...
```

这样字段变化时，人类 dashboard 和 Agent 查询一起改，不会漂移。

## 推荐文件分层

```text
<project>/
├── README.md                         # 项目入口和路由
├── <project>-asset-standard.md       # 资产标准、字段、归位、迁移规则
├── <project>-query-panel.md          # Dataview + Agent JSON 查询面板
├── prompts/
│   ├── system/
│   │   └── <project>-harness.md      # Agent 运行时调度器
│   └── workflow/
│       ├── <project>-contract.md     # 单件产物合同
│       ├── stage-gates.md            # 阶段门禁
│       ├── publish-gate.md           # 发布门禁
│       └── ...
├── drafts/                           # 短周期草稿
├── research/                         # 单篇文章资料包
├── style/                            # 稳定风格资产
└── highlights/                       # 值得沉淀的 AI 对话
```

不是每个项目都需要所有目录。先有真实需求，再建目录。

## README 纯度检查

如果 README 里出现以下内容，应考虑拆出：

| 内容 | 推荐去处 |
|---|---|
| 字段表、frontmatter 规范 | asset standard |
| Dataview 和 CLI 查询 | query panel |
| 多步执行流程 | workflow |
| 质量检查清单 | gates |
| 单篇产物目标约束 | contract |
| 大段 prompt | prompts/system 或 prompts/workflow |
| 目录归位细则 | asset standard |

README 可以保留这些内容的链接，但不承载细节。

## Harness 化迁移顺序

### 第 1 步：定义项目边界

先写清楚：

- 这个项目生产什么。
- 什么内容不属于这个项目。
- 上游输入是什么。
- 下游流向哪里。

产物：README 的第一屏。

### 第 2 步：抽出资产标准

把 README 中所有字段、分类、目录归位、迁移规则移到 asset standard。

产物：`<project>-asset-standard.md`。

### 第 3 步：抽出查询面板

把所有 Dataview 和 Agent JSON 合并到 query panel。

产物：`<project>-query-panel.md`。

要求：每个查询主题同时有 Dataview 和 Agent JSON。

### 第 4 步：定义 harness

Harness 只保留运行时调度：

- 读取顺序。
- 资产选择。
- stage 判断。
- workflow 选择。
- 输出模板。
- 禁止越界。

产物：`prompts/system/<project>-harness.md`。

### 第 5 步：拆 workflow

把“怎么做”的流程拆成独立 workflow。

每个 workflow 至少包含：

- 用途。
- 输入。
- 输出。
- 规则。
- 停止条件。

### 第 6 步：补 contract 和 gates

用 contract 管单件产物目标，用 gates 管阶段推进。

没有 contract，Agent 容易直接写稿；没有 gates，workflow 容易一路放行。

### 第 7 步：回收 README

最后把 README 收缩成：

- 项目定义。
- 快速入口。
- 给 AI 的读取顺序。
- Pattern / placement 总览。
- 维护节奏。

详细内容只链接，不展开。

## Writing-Studio 当前迁移建议

当前 `Writing-Studio/README.md` 应该最终拆成：

| 当前内容                     | 去处                                              |
| ------------------------ | ----------------------------------------------- |
| 快速入口、项目定义、Pattern A/B 简表 | 保留在 README                                      |
| 查询面板（Dataview + Agent）   | `writing-query-panel.md`                        |
| 详细工作流图和执行顺序              | `prompts/workflow/ai-assisted-writing-guide.md` |
| 目录说明、命名、完稿流向             | `writing-asset-standard.md`，README 只保留摘要        |
| Harness 资产清单             | README 保留入口，详细聚合交给 query panel                  |
| 概念库使用规则                  | README 保留一行入口，细则放 harness 或 query panel         |

迁移后 README 的目标长度应该明显变短。它应该像机场指示牌，不应该像操作手册。

## 质量标准

一个项目完成 harness 化后，应满足：

- 新人能从 README 找到入口。
- Agent 能从 harness 判断下一步。
- 资产能被 Dataview 和 CLI 查询稳定召回。
- 单件产物有 contract。
- 阶段推进有 gates。
- 详细流程在 workflow，不散落在 README。
- 外部知识上下文只读引用，不被复制成第二份。

## 禁忌

- 不为抽象完整性创建目录。
- 不把 README 写成所有规则的唯一载体。
- 不在多个文件维护同一份清单。
- 不让 Agent 查询和 Dataview 分离。
- 不把概念库、研究资料、风格资产复制进项目内部。
- 不把 checklist 冒充 gate。
