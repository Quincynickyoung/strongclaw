# StrongClaw Skills

Skills 是 StrongClaw 的知识库，用 Markdown 文档的形式提供各种能力。

## 什么是 Skills？

Skills 不是代码，而是**知识**：

- 📝 **Markdown 文档** - 纯文本，易于理解和维护
- 🧠 **知识驱动** - Agent 读取后理解并执行
- 🔄 **可组合** - 多个 Skills 可以组合使用
- 📈 **自动提升** - 模型升级时自动受益

## 核心理念

> **工具 ≠ 能力**
> - 工具是"手段"（read/write/edit/bash）
> - 能力是"知识"（怎么用这些手段完成任务）

StrongClaw 只有 4 个基础工具，但通过 Skills 可以实现无限能力。

## 现有 Skills

### 1. File Operations
**文件：** `skills/file-operations.md`

**能力：**
- 批量文件操作
- 文件分析和统计
- 文件备份和恢复
- 文件比较和压缩

**使用场景：**
- 批量重命名文件
- 清理临时文件
- 代码格式化
- 文件备份

### 2. Git Operations
**文件：** `skills/git-operations.md`

**能力：**
- 代码审查和历史查看
- 分支管理和合并
- 提交管理和整理
- 远程仓库操作

**使用场景：**
- 创建功能分支
- 修复 Bug
- 整理提交历史
- 代码审查

## 如何使用 Skills

### 方式 1：自动加载（推荐）

StrongClaw 会自动扫描 `skills/` 目录并加载所有 Skills。

```bash
# 启动时自动加载
npm run dev
```

### 方式 2：手动指定

```bash
# 指定 Skills 目录
npm run dev -- --skills-path ./skills
```

### 方式 3：在对话中引用

```
🦅 > 帮我批量重命名所有 .txt 文件为 .md

Agent 会：
1. 读取 file-operations.md Skill
2. 理解批量重命名的方法
3. 使用 bash 工具执行操作
```

## 如何创建新 Skill

### 1. 创建 Markdown 文件

在 `skills/` 目录下创建新的 `.md` 文件。

### 2. 编写 Skill 内容

```markdown
# Your Skill Name

简短描述这个 Skill 的用途。

## 能力

### 能力 1

描述和示例...

### 能力 2

描述和示例...

## 使用示例

### 示例 1

具体的使用步骤...

## 注意事项

重要的提示和警告...
```

### 3. 测试 Skill

```bash
# 启动 StrongClaw
npm run dev

# 在对话中测试
🦅 > 使用 [你的 Skill] 完成 [某个任务]
```

## Skill 编写指南

### ✅ 好的 Skill

- **清晰的结构** - 使用标题和列表
- **具体的示例** - 提供可执行的命令
- **组合工具** - 展示如何组合 4 个基础工具
- **注意事项** - 提醒潜在的风险

### ❌ 避免的做法

- **不要写代码** - Skills 是知识，不是代码
- **不要太抽象** - 提供具体的示例
- **不要太复杂** - 保持简单和专注
- **不要重复** - 引用其他 Skills 而不是重复内容

## Skill 示例模板

```markdown
# Skill Name

一句话描述这个 Skill。

## 能力

### 1. 能力名称

**描述：** 这个能力做什么

**使用方法：**
\`\`\`bash
# 具体的命令或步骤
\`\`\`

## 使用示例

### 示例 1：场景描述

\`\`\`bash
# 步骤 1
command1

# 步骤 2
command2
\`\`\`

## 注意事项

1. 注意事项 1
2. 注意事项 2

## 组合使用基础工具

说明如何组合使用 read/write/edit/bash 完成任务。
```

## 贡献 Skills

欢迎贡献新的 Skills！

1. Fork 仓库
2. 在 `skills/` 目录创建新 Skill
3. 测试 Skill
4. 提交 Pull Request

详见 [贡献指南](../CONTRIBUTING.md)

## 常见问题

### Q: Skills 和工具有什么区别？

A:
- **工具** - 基础操作（read/write/edit/bash）
- **Skills** - 知识和方法（如何组合工具完成任务）

### Q: 为什么 Skills 是 Markdown 而不是代码？

A:
- 更容易理解和维护
- 模型可以直接理解
- 模型升级时自动受益
- 不会变成技术债

### Q: 可以创建多少个 Skills？

A: 没有限制！但建议：
- 每个 Skill 专注一个领域
- 保持 Skill 简洁
- 避免重复内容

### Q: Skills 会影响性能吗？

A: 不会！
- Skills 列表很小（只有文件名）
- 只有用到时才读取完整内容
- 90% 的内容在 Prompt Cache 中

## 下一步

- 查看现有 Skills 了解如何编写
- 创建你自己的 Skill
- 分享你的 Skill 给社区

---

**记住：Skills 是知识，不是代码。通过知识驱动，StrongClaw 可以实现无限可能！** 🦅
