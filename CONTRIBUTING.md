# 贡献指南

感谢你对 StrongClaw 的关注！我们欢迎任何形式的贡献。

## 🎯 贡献方式

### 1. 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](https://github.com/Quincynickyoung/strongclaw/issues) 确认问题是否已被报告
2. 如果没有，创建一个新的 Issue，包含：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息（OS、Node.js 版本等）
   - 相关的日志或截图

### 2. 提出新功能

如果你有新功能的想法：

1. 先创建一个 Issue 讨论
2. 说明：
   - 功能的用途和价值
   - 预期的使用方式
   - 可能的实现方案

### 3. 提交代码

#### 准备工作

```bash
# Fork 仓库并克隆
git clone https://github.com/YOUR_USERNAME/strongclaw.git
cd strongclaw

# 安装依赖
npm install

# 创建新分支
git checkout -b feature/your-feature-name
```

#### 开发规范

**代码风格：**
- 使用 TypeScript
- 遵循现有的代码风格
- 添加必要的注释
- 保持代码简洁

**提交规范：**

使用语义化的提交消息：

```
<emoji> <type>: <description>

<详细说明>

Co-Authored-By: Your Name <your@email.com>
```

**Emoji 参考：**
- 🎉 `:tada:` - 初始提交
- ✨ `:sparkles:` - 新功能
- 🐛 `:bug:` - Bug 修复
- 📝 `:memo:` - 文档更新
- 🎨 `:art:` - 代码格式/结构改进
- ⚡️ `:zap:` - 性能优化
- 🔧 `:wrench:` - 配置文件修改
- ♻️ `:recycle:` - 代码重构
- 🚀 `:rocket:` - 部署相关
- 🔒 `:lock:` - 安全相关
- ✅ `:white_check_mark:` - 添加测试
- 🔥 `:fire:` - 删除代码或文件

**Type 参考：**
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式
- `refactor` - 重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/工具相关

**示例：**
```bash
git commit -m "✨ feat: Add support for local models

- Add Ollama integration
- Add LM Studio support
- Update documentation

Co-Authored-By: Your Name <your@email.com>"
```

#### 测试

```bash
# 运行测试
npm test

# 运行 CLI 测试
npm run dev
```

确保：
- 所有测试通过
- 新功能有对应的测试
- 代码没有明显的 bug

#### 提交 Pull Request

1. 推送你的分支
```bash
git push origin feature/your-feature-name
```

2. 在 GitHub 上创建 Pull Request

3. PR 描述应包含：
   - 改动的目的和背景
   - 主要变更内容
   - 相关的 Issue 编号（如果有）
   - 测试情况
   - 截图或 GIF（如果适用）

4. 等待 Review
   - 维护者会尽快 review
   - 根据反馈进行修改
   - 保持耐心和友好

### 4. 改进文档

文档同样重要！你可以：

- 修正错别字
- 改进表述
- 添加示例
- 翻译文档

文档位于：
- `README.md` - 项目说明
- `docs/` - 详细文档
- 代码注释

---

## 🎨 开发指南

### 项目结构

```
strongclaw/
├── src/
│   ├── core/           # 核心引擎
│   ├── cli.ts          # CLI 界面
│   └── index.ts        # 入口文件
├── test/               # 测试文件
├── docs/               # 文档
└── package.json
```

### 核心概念

**1. 极简工具**
- 只有 4 个基础工具：read, write, edit, bash
- 不要添加新的工具，除非有充分的理由

**2. Skills 驱动**
- 新能力通过 Skills（Markdown 文档）添加
- 不要用代码实现可以用 Skills 实现的功能

**3. 模型无关**
- 支持多个模型提供商
- 不要依赖特定模型的特性

### 添加新功能

**示例：添加新的模型提供商**

1. 在 `src/core/model-provider.ts` 中添加配置
2. 更新 `docs/MODELS.md` 文档
3. 添加测试
4. 更新 README

---

## 🐛 报告安全问题

如果你发现了安全漏洞，请**不要**公开报告。

请发送邮件到：[你的邮箱]

我们会尽快响应并修复。

---

## 📋 开发路线图

查看 [CHANGELOG.md](CHANGELOG.md) 了解当前的开发进度。

当前优先级：

**高优先级：**
- [ ] Phase 2: Gateway 层
- [ ] 消息路由
- [ ] 权限控制

**中优先级：**
- [ ] Electron GUI
- [ ] 更多 Skills
- [ ] GitHub Actions

**低优先级：**
- [ ] 飞书 Bot
- [ ] Docker 沙箱

---

## 💡 提示

- **保持简单** - StrongClaw 的核心是极简
- **遵循哲学** - 理解 Pi 的设计理念
- **测试充分** - 确保代码质量
- **文档完善** - 好的文档和好的代码一样重要
- **友好沟通** - 保持尊重和友好

---

## 🙏 感谢

感谢所有贡献者！

你的贡献让 StrongClaw 变得更好。

---

## 📮 联系方式

- GitHub Issues: [https://github.com/Quincynickyoung/strongclaw/issues](https://github.com/Quincynickyoung/strongclaw/issues)
- 项目地址: [https://github.com/Quincynickyoung/strongclaw](https://github.com/Quincynickyoung/strongclaw)

---

**再次感谢你的贡献！** 🎉
