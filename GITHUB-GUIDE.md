# GitHub 自动提交使用指南

## 🎉 仓库已创建

**仓库地址：** https://github.com/Quincynickyoung/strongclaw

**用户名：** Quincynickyoung

---

## 🤖 自动提交功能

### 方式 1：使用自动提交脚本（推荐）

```bash
# 快速提交（使用默认消息）
./auto-commit.sh

# 自定义提交消息
./auto-commit.sh "Add new feature: XXX"
```

### 方式 2：手动提交

```bash
# 1. 查看变更
git status

# 2. 添加文件
git add .

# 3. 提交
git commit -m "Your commit message

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"

# 4. 推送
git push
```

---

## 📝 提交消息规范

建议使用以下格式：

```
<emoji> <type>: <description>

<详细说明>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

### Emoji 参考

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

### Type 参考

- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式
- `refactor` - 重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/工具相关

---

## 🔄 常用命令

### 查看状态
```bash
git status
```

### 查看提交历史
```bash
git log --oneline
```

### 查看远程仓库
```bash
git remote -v
```

### 拉取最新代码
```bash
git pull
```

### 查看分支
```bash
git branch -a
```

---

## 🌟 GitHub 仓库管理

### 查看仓库信息
```bash
gh repo view
```

### 在浏览器中打开仓库
```bash
gh repo view --web
```

### 查看 Issues
```bash
gh issue list
```

### 创建 Issue
```bash
gh issue create
```

### 查看 Pull Requests
```bash
gh pr list
```

---

## 📦 发布 Release

### 创建 Release
```bash
gh release create v0.1.0 --title "v0.1.0 - Initial Release" --notes "First public release of StrongClaw"
```

### 查看 Releases
```bash
gh release list
```

---

## 🔐 安全提示

1. **不要提交敏感信息**
   - API Keys
   - 密码
   - 私钥
   - `.env` 文件（已在 .gitignore 中）

2. **检查 .gitignore**
   - 确保敏感文件被忽略
   - 定期审查忽略规则

3. **定期更新依赖**
   ```bash
   npm audit
   npm update
   ```

---

## 🎯 下一步

1. **添加 README badges**
   - License badge
   - Version badge
   - Build status

2. **设置 GitHub Actions**
   - 自动测试
   - 自动发布

3. **完善文档**
   - API 文档
   - 贡献指南
   - 更新日志

---

## 💡 提示

- 每次有重要更新时，记得推送到 GitHub
- 使用有意义的提交消息
- 定期查看仓库的 Issues 和 PRs
- 保持代码和文档同步更新

---

**仓库地址：** https://github.com/Quincynickyoung/strongclaw

**快速提交：** `./auto-commit.sh "Your message"`
