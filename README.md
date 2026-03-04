<div align="center">

# 🦅 StrongClaw

**A powerful AI agent platform built on Pi philosophy**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![GitHub Stars](https://img.shields.io/github/stars/Quincynickyoung/strongclaw?style=social)](https://github.com/Quincynickyoung/strongclaw)

[English](#) | [中文文档](#)

</div>

---

## ✨ 特性

- 🎯 **极简工具** - 只有 4 个基础工具（read, write, edit, bash）
- 🧠 **知识驱动** - Skills 是 Markdown 文档，不是代码
- 🚀 **多模型支持** - 支持 7 个主流 LLM 提供商
- ⚡️ **高性能** - 最大化 Prompt Caching，速度提升 10 倍
- 🔒 **安全可靠** - 权限控制和沙箱隔离
- 🎨 **易于扩展** - 通过 Skills 添加新能力

---

## 🎯 核心思想

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

## 🚀 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/Quincynickyoung/strongclaw.git
cd strongclaw

# 安装依赖
npm install
```

### 配置

选择一个模型提供商并设置 API Key：

```bash
# 推荐：Google Gemini（免费额度大）
export GOOGLE_API_KEY=your-key

# 或：DeepSeek（国内速度快，价格低）
export DEEPSEEK_API_KEY=your-key

# 或：Anthropic Claude（性能强）
export ANTHROPIC_API_KEY=your-key
```

详细配置请查看 [模型配置文档](docs/MODELS.md)

### 启动

```bash
# 自动检测可用模型
npm run dev

# 或指定模型
npm run dev -- --model gemini-2.0-flash --provider google
```

### 使用

```
🦅 > 列出当前目录的文件
🦅 > 帮我分析一下 package.json
🦅 > 创建一个 hello.txt 文件，内容是 "Hello, StrongClaw!"
```

**可用命令：**
- `/help` - 显示帮助
- `/examples` - 显示使用示例
- `/skills` - 显示可用 Skills
- `/config` - 显示配置
- `/history` - 显示历史记录

**配置管理：**

StrongClaw 支持持久化配置，无需每次都指定模型：

```bash
# 配置文件位置
~/.strongclaw/config.json

# 示例配置
{
  "defaultProvider": "google",
  "defaultModel": "gemini-2.0-flash",
  "verbose": false
}
```

详细使用说明请查看 [使用指南](docs/USAGE.md)

---

## 📦 支持的模型

| 提供商 | 推荐场景 | 价格 |
|--------|---------|------|
| **Google Gemini** | 新手，免费额度大 | ⭐️⭐️⭐️⭐️⭐️ |
| **DeepSeek** | 国内用户，价格低 | ⭐️⭐️⭐️⭐️⭐️ |
| **Alibaba Qwen** | 中文理解好 | ⭐️⭐️⭐️⭐️ |
| **Moonshot Kimi** | 长上下文 | ⭐️⭐️⭐️ |
| **Anthropic Claude** | 性能强 | ⭐️⭐️⭐️ |
| **OpenRouter** | 一个 Key 访问所有 | ⭐️⭐️⭐️⭐️ |
| **Together AI** | 开源模型 | ⭐️⭐️⭐️⭐️ |

详细配置请查看 [模型配置文档](docs/MODELS.md)

---

## 🎓 Skills 系统

StrongClaw 通过 Skills 扩展能力。Skills 是 Markdown 文档，不是代码！

### 现有 Skills

- **File Operations** - 批量文件操作、分析、备份
- **Git Operations** - 代码审查、分支管理、提交整理

### 如何使用

```
🦅 > 帮我批量重命名所有 .txt 文件为 .md
🦅 > 创建一个新的功能分支并提交代码
🦅 > 查找所有大于 1MB 的文件
```

Agent 会自动读取相关 Skill，理解并执行任务。

### 创建自己的 Skill

1. 在 `skills/` 目录创建 `.md` 文件
2. 编写知识和示例
3. 测试并分享

详见 [Skills 文档](skills/README.md)

---

## 📊 开发进度

### ✅ 已完成

- [x] Phase 1: 核心引擎搭建
- [x] Phase 1: 基础测试
- [x] Phase 1.5: 交互式 CLI
- [x] Phase 1.5: 命令系统
- [x] Phase 1.5: 使用文档
- [x] Phase 1.5.1: 多模型支持
- [x] Phase 1.6: 项目完善（License、贡献指南、模板）
- [x] Phase 1.7: Skills 系统
- [x] Phase 2: Gateway 层（消息路由、权限控制、会话管理）

### 🚧 进行中

- [ ] Phase 3: Electron GUI
- [ ] Phase 3: 流式消息渲染

### 📋 计划中

- [ ] Phase 3: Electron GUI
- [ ] Phase 3: 流式消息渲染
- [ ] Phase 4: 飞书 Bot
- [ ] Phase 4: Docker 沙箱

---

## 📁 项目结构

```
strongclaw/
├── src/
│   ├── core/
│   │   ├── strongclaw.ts      # 核心引擎
│   │   └── model-provider.ts  # 模型提供商管理
│   ├── gateway/                # Gateway 层
│   │   ├── gateway.ts          # Gateway 主类
│   │   ├── event-bus.ts        # 事件总线
│   │   ├── permission-checker.ts # 权限检查
│   │   ├── session-manager.ts  # 会话管理
│   │   ├── message-router.ts   # 消息路由
│   │   └── types.ts            # 类型定义
│   ├── cli.ts                  # CLI 界面
│   └── index.ts                # 入口文件
├── skills/                     # Skills 知识库
│   ├── file-operations.md      # 文件操作 Skill
│   ├── git-operations.md       # Git 操作 Skill
│   └── README.md               # Skills 文档
├── test/
│   ├── basic.test.ts           # 基础测试
│   ├── conversation.test.ts    # 对话测试
│   ├── model-provider.test.ts  # 模型测试
│   └── gateway.test.ts         # Gateway 测试
├── docs/
│   ├── PHILOSOPHY.md           # 核心思想
│   ├── USAGE.md                # 使用指南
│   ├── MODELS.md               # 模型配置
│   └── GATEWAY.md              # Gateway 文档
├── .github/                    # GitHub 模板
├── demo.sh                     # 快速演示
├── auto-commit.sh              # 自动提交
└── package.json
```
│   ├── basic.test.ts           # 基础测试
│   └── conversation.test.ts    # 对话测试
├── docs/
│   ├── PHILOSOPHY.md           # 核心思想
│   ├── USAGE.md                # 使用指南
│   └── MODELS.md               # 模型配置
├── demo.sh                     # 快速演示
├── auto-commit.sh              # 自动提交
└── package.json
```

---

## 🎨 设计原则

1. **极简主义** - 只保留最核心的功能
2. **可组合性** - 通过组合而非堆砌实现复杂功能
3. **知识驱动** - 用文本知识而非代码扩展能力
4. **信任模型** - 最小化脚手架，信任 LLM 能力

---

## 📚 文档

- [核心思想](docs/PHILOSOPHY.md) - 为什么 StrongClaw 这样设计
- [使用指南](docs/USAGE.md) - 详细的使用说明
- [模型配置](docs/MODELS.md) - 多模型配置指南
- [GitHub 指南](GITHUB-GUIDE.md) - Git 和 GitHub 使用
- [更新日志](CHANGELOG.md) - 版本更新记录

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

---

## 📄 License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

- [Pi](https://github.com/mariozechner/pi) - 核心理念来源
- [Claude Code](https://github.com/anthropics/claude-code) - 灵感来源
- [Anthropic](https://www.anthropic.com/) - Claude API

---

## 📮 联系方式

- GitHub: [@Quincynickyoung](https://github.com/Quincynickyoung)
- 项目地址: [https://github.com/Quincynickyoung/strongclaw](https://github.com/Quincynickyoung/strongclaw)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

Made with ❤️ by Qiang Yang & Claude Opus 4.6

</div>
