# StrongClaw

> A powerful AI agent platform built on Pi philosophy

## 核心思想

StrongClaw 遵循 Pi 的极简哲学：

### 1. 极简工具（4 个基础工具）

```
read   → 读取文件（眼睛）
write  → 写入文件（笔）
edit   → 编辑文件（橡皮擦）
bash   → 执行命令（手）
```

**为什么只有 4 个？**
- 不是因为做不了更多
- 而是因为：**更多工具 = 更多约束 = 更少灵活性**
- **4 个工具 + 无限组合 > 50 个固定工具**

### 2. Skills = 知识库，不是工具库

> **工具 ≠ 能力**
> - 工具是"手段"（read/write/edit/bash）
> - 能力是"知识"（怎么用这些手段完成任务）

**Skills 的本质：**
- Markdown 文档，不是代码
- Agent 读取 → 理解 → 自己执行
- 新能力 = 写一个 Markdown 文档

### 3. 最大化 Prompt Caching

**传统方式：**
```
20 个工具 × 500 tokens = 10,000 tokens
→ 每次对话都要重新处理
```

**StrongClaw 方式：**
```
4 个工具 × 100 tokens + Skills 列表 = ~3,000 tokens
→ 90% 在 cache 里
→ 只有用到的 skill 才读取完整内容
```

### 4. 不和模型对赌

> "代码保质期只有几个月，不要和模型对赌。所有非模型能力最终都会变成技术债。"
> — Boris (Claude Code 创始人)

**StrongClaw 的选择：**
- 最小化"非模型能力"（只有 4 个工具）
- Skills 是纯文本，模型提升时自动受益
- 没有复杂的 chain-of-thought 脚手架

---

## 快速开始

### 1. 设置 API Key

```bash
export ANTHROPIC_API_KEY=your-api-key-here
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动 CLI

```bash
npm run dev
```

### 4. 开始对话

```
🦅 > 列出当前目录的文件
🦅 > 帮我分析一下 package.json
🦅 > 创建一个 hello.txt 文件
```

详细使用说明请查看 [使用指南](docs/USAGE.md)

---

## 项目结构

```
strongclaw/
├── src/
│   ├── core/           # 核心引擎
│   ├── gateway/        # 消息路由和权限控制
│   ├── channels/       # 通信渠道（Electron、飞书等）
│   └── index.ts        # 入口
├── skills/             # Skills 知识库
├── test/               # 测试
└── docs/               # 文档
```

---

## 设计原则

1. **极简主义** - 只保留最核心的功能
2. **可组合性** - 通过组合而非堆砌实现复杂功能
3. **知识驱动** - 用文本知识而非代码扩展能力
4. **信任模型** - 最小化脚手架，信任 LLM 能力

---

---

## 开发进度

### ✅ 已完成

| 阶段 | 功能 | 状态 |
|------|------|------|
| Phase 1 | 核心引擎搭建 | ✅ 完成 |
| Phase 1 | 基础测试 | ✅ 完成 |
| Phase 1.5 | 交互式 CLI | ✅ 完成 |
| Phase 1.5 | 命令系统 | ✅ 完成 |
| Phase 1.5 | 使用文档 | ✅ 完成 |

### 🚧 进行中

| 阶段 | 功能 | 状态 |
|------|------|------|
| Phase 1.5 | 多模型支持 | 🚧 开发中 |

### 📋 待办事项

| 阶段 | 功能 | 优先级 |
|------|------|--------|
| Phase 2 | Gateway 层 | 高 |
| Phase 2 | 消息路由 | 高 |
| Phase 2 | 权限控制 | 高 |
| Phase 3 | Electron GUI | 中 |
| Phase 3 | 流式消息渲染 | 中 |
| Phase 4 | 飞书 Bot | 低 |
| Phase 4 | Docker 沙箱 | 低 |

---

## 支持的模型

StrongClaw 支持多个主流 LLM 提供商：

### 官方 API
- **Anthropic Claude** - claude-sonnet-4, claude-opus-4
- **Google Gemini** - gemini-2.0-flash, gemini-pro
- **Moonshot Kimi** - moonshot-v1-8k, moonshot-v1-32k
- **DeepSeek** - deepseek-chat, deepseek-coder
- **Alibaba Qwen** - qwen-turbo, qwen-plus, qwen-max

### 聚合服务商
- **OpenRouter** - 支持 100+ 模型
- **Together AI** - 支持开源模型

详细配置请查看 [模型配置文档](docs/MODELS.md)

---

## License

MIT
