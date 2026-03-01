# StrongClaw 核心思想文档

## 为什么叫 StrongClaw？

- **Strong**：来自创始人名字中的"强"字
- **Claw**：呼应 OpenClaw，代表 AI Agent 的"爪子"（执行能力）
- **寓意**：强大的执行力 + 极简的设计哲学

---

## 核心思想：Pi 哲学

StrongClaw 100% 遵循 Pi 的设计哲学，这不是简单的模仿，而是对这一理念的深刻认同。

### 1. 极简工具：4 个就够了

```
read   → 读取文件（眼睛）
write  → 写入文件（笔）
edit   → 编辑文件（橡皮擦）
bash   → 执行命令（手）
```

#### 为什么只有 4 个？

**不是因为做不了更多，而是因为：**

> **更多工具 = 更多约束 = 更少灵活性**

**用乐高类比：**

- **方式 A（传统 Agent）**：给你 50 个预制组件
  - 有"门"、"窗户"、"屋顶"、"烟囱"...
  - 每个组件功能明确，但组合受限
  - 新需求？等厂商出新组件

- **方式 B（StrongClaw）**：只给你 4 种基础积木
  - 2×2 方块、2×4 长条、转角块、连接件
  - 看起来简单，但能搭出任何东西
  - 新需求？自己组合

**数学证明：**

```
50 个固定工具 = 50 种能力

4 个基础工具 × 无限组合 = ∞ 种能力
```

#### 实例：用 4 个工具分析项目

**场景：找出项目中最常修改的文件**

```bash
# 1. bash: 找出修改最频繁的文件
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -10

# 2. read: 读取最常改的文件
src/utils/helper.js

# 3. bash: 统计这个文件的修改行数
git log -p src/utils/helper.js | grep "^+" | wc -l

# 4. write: 生成分析报告
analysis-report.md
```

**关键：** 这 4 个工具的组合是无限的，Agent 自己决定怎么组合。

---

### 2. Skills：知识库而非工具库

#### 打破误解

很多人以为只有 4 个工具，功能太少。实际上：

> **工具 ≠ 能力**
>
> - 工具是"手段"（read/write/edit/bash）
> - 能力是"知识"（怎么用这些手段完成任务）

#### Skills 的本质

**传统方式：**
```
新功能 = 写代码 + 编译 + 部署
```

**StrongClaw 方式：**
```
新功能 = 写 Markdown 文档
```

#### Skills 示例

```markdown
# web-browser skill

---
name: web-browser
description: 使用 Chrome DevTools Protocol 控制浏览器
---

## 如何使用

1. 启动 Chrome：
   bash: chrome --remote-debugging-port=9222

2. 打开网页：
   bash: curl http://localhost:9222/json/new?https://example.com

3. 执行 JavaScript：
   bash: wscat -c ws://localhost:9222/devtools/page/xxx
   ...
```

**关键点：**
- Skills 是 Markdown 文件，不是代码
- Agent 读取 skill → 理解如何做 → 自己执行
- **新能力 = 写一个 Markdown 文档**

#### Skills vs 传统工具

| 维度 | 传统 Agent | StrongClaw + Skills |
|------|-----------|---------------------|
| 添加新能力 | 写代码、编译、部署 | 写 Markdown 文档 |
| 谁来维护 | 开发者 | **Agent 自己** |
| 灵活性 | 固定功能 | **Agent 可以改进** |
| 学习成本 | 学习 API | 读文档 |

---

### 3. 最大化 Prompt Caching

#### 为什么 StrongClaw 这么快？

**传统方式：**
```
20 个工具 × 每个 500 tokens = 10,000 tokens 系统提示词
→ 每次对话都要重新处理这 10,000 tokens
→ 慢 + 贵
```

**StrongClaw 的方式：**
```
4 个工具 × 100 tokens + 50 个 skills × 50 tokens = 2,900 tokens
→ 大部分在 cache 里
→ 只有用到的 skill 才读取完整内容（按需加载）
→ 快 + 便宜
```

**结果：**
- 90% 的系统提示词被缓存
- 速度快 10 倍
- 成本降低 90%

#### Prompt Caching 的秘密

**系统提示词结构：**
```
[固定部分 - 永远在 cache]
  - 4 个工具定义（400 tokens）
  - Skills 列表（name + description，2,500 tokens）

[动态部分 - 按需加载]
  - 用到的 skill 完整内容（只在需要时读取）
```

**对比：**
- 传统方案：10,000 tokens，每次都要处理
- StrongClaw：2,900 tokens 在 cache，动态加载 < 1,000 tokens

---

### 4. 不和模型对赌

#### 核心理念

> "代码保质期只有几个月。不要和模型对赌。所有非模型能力最终都会变成技术债。"
> — Boris (Claude Code 创始人)

#### 什么是"和模型对赌"？

**错误做法：**
```typescript
// ❌ 复杂的 chain-of-thought 脚手架
function complexReasoning(input) {
  const step1 = analyzeInput(input);
  const step2 = generatePlan(step1);
  const step3 = validatePlan(step2);
  const step4 = executePlan(step3);
  // ... 100 行代码
}
```

**问题：**
- 模型升级后，这些脚手架可能变成累赘
- 新模型可能有更好的推理能力
- 你的代码变成了技术债

**正确做法（StrongClaw）：**
```typescript
// ✅ 最小化脚手架，信任模型
function simplePrompt(input) {
  return agent.prompt(input);
}
```

#### StrongClaw 的选择

**最小化"非模型能力"：**
- 只有 4 个工具（read/write/edit/bash）
- 没有复杂的推理框架
- 没有硬编码的工作流

**Skills 是纯文本：**
- 模型提升时自动受益
- 不需要重写代码
- 知识可以被模型理解和改进

**信任模型能力：**
- 让模型自己决定如何组合工具
- 让模型自己理解 Skills
- 让模型自己优化执行流程

---

## 设计原则

### 1. 极简主义

> "完美不是无可增加，而是无可减少。"

- 只保留最核心的功能
- 每个组件都有明确的职责
- 没有冗余的抽象层

### 2. 可组合性

> "简单的部件，复杂的组合。"

- 4 个工具可以组合出无限可能
- Skills 可以相互引用
- 扩展系统支持插件式开发

### 3. 知识驱动

> "用文本知识而非代码扩展能力。"

- Skills 是 Markdown 文档
- Agent 自己理解和执行
- 知识可以被模型改进

### 4. 信任模型

> "最小化脚手架，信任 LLM 能力。"

- 不要过度设计
- 不要和模型对赌
- 让模型发挥最大潜力

---

## 与其他方案的对比

### StrongClaw vs LangChain

| 维度 | LangChain | StrongClaw |
|------|-----------|------------|
| 工具数量 | 100+ | 4 |
| 扩展方式 | 写代码 | 写 Markdown |
| 抽象层次 | 多层抽象 | 单层抽象 |
| 学习曲线 | 陡峭 | 平缓 |
| 技术债 | 高 | 低 |

### StrongClaw vs AutoGPT

| 维度 | AutoGPT | StrongClaw |
|------|---------|------------|
| 复杂度 | 高 | 低 |
| 可控性 | 低 | 高 |
| 推理框架 | 硬编码 | 信任模型 |
| 扩展性 | 中 | 高 |

### StrongClaw vs 从头写

| 维度 | 从头写 | StrongClaw |
|------|--------|------------|
| 开发时间 | 数月 | 数周 |
| 维护成本 | 高 | 低 |
| 社区支持 | 无 | Pi 社区 |
| 成熟度 | 低 | 高 |

---

## 总结

StrongClaw 的核心思想可以用一句话概括：

> **极简工具 + 知识驱动 + 信任模型 = 无限可能**

这不是简单的技术选择，而是一种设计哲学：

1. **少即是多** - 4 个工具胜过 50 个
2. **知识胜于代码** - Markdown 胜过 TypeScript
3. **组合胜于堆砌** - 灵活组合胜过固定功能
4. **信任胜于控制** - 信任模型胜于硬编码

这就是 StrongClaw 的核心思想，也是我们构建这个项目的指导原则。
