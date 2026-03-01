# Git Operations Skill

这个 Skill 提供了 Git 版本控制的高级操作能力。

## 能力

### 1. 代码审查

**查看最近的改动：**

```bash
# 查看最近 5 次提交
git log --oneline -5

# 查看某次提交的详细改动
git show <commit-hash>

# 查看文件的修改历史
git log -p <file-path>
```

**查看当前改动：**

```bash
# 查看工作区改动
git diff

# 查看暂存区改动
git diff --staged

# 查看特定文件的改动
git diff <file-path>
```

### 2. 分支管理

**创建和切换分支：**

```bash
# 创建新分支
git checkout -b feature/new-feature

# 切换分支
git checkout main

# 查看所有分支
git branch -a
```

**合并分支：**

```bash
# 合并分支
git merge feature/new-feature

# 如果有冲突，查看冲突文件
git status

# 解决冲突后
git add <resolved-files>
git commit
```

### 3. 提交管理

**修改提交：**

```bash
# 修改最后一次提交
git commit --amend

# 交互式 rebase（整理提交历史）
git rebase -i HEAD~3
```

**撤销改动：**

```bash
# 撤销工作区改动
git checkout -- <file>

# 撤销暂存
git reset HEAD <file>

# 撤销提交（保留改动）
git reset --soft HEAD~1

# 撤销提交（丢弃改动）
git reset --hard HEAD~1
```

### 4. 远程操作

**同步远程仓库：**

```bash
# 拉取最新代码
git pull origin main

# 推送到远程
git push origin main

# 查看远程仓库
git remote -v
```

**处理冲突：**

```bash
# 拉取时如果有冲突
git pull origin main

# 查看冲突文件
git status

# 手动解决冲突后
git add <resolved-files>
git commit
```

### 5. 代码搜索

**搜索提交历史：**

```bash
# 搜索包含特定内容的提交
git log --all --grep="bug fix"

# 搜索修改了特定代码的提交
git log -S "function_name"

# 查看谁修改了某行代码
git blame <file-path>
```

## 使用示例

### 示例 1：创建功能分支并提交

```bash
# 1. 创建新分支
git checkout -b feature/add-login

# 2. 进行开发...
# 使用 write/edit 工具修改代码

# 3. 查看改动
git status
git diff

# 4. 提交改动
git add .
git commit -m "✨ feat: Add login functionality"

# 5. 推送到远程
git push origin feature/add-login
```

### 示例 2：修复 Bug

```bash
# 1. 创建 bugfix 分支
git checkout -b bugfix/fix-crash

# 2. 修复 bug...
# 使用 edit 工具修改代码

# 3. 提交
git add <fixed-files>
git commit -m "🐛 fix: Fix crash on startup"

# 4. 推送并创建 PR
git push origin bugfix/fix-crash
```

### 示例 3：整理提交历史

```bash
# 1. 查看最近的提交
git log --oneline -5

# 2. 交互式 rebase
git rebase -i HEAD~3

# 3. 在编辑器中：
#    - pick: 保留提交
#    - squash: 合并到上一个提交
#    - reword: 修改提交消息

# 4. 强制推送（如果已经推送过）
git push --force origin feature-branch
```

## 最佳实践

### 提交消息规范

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
- 🎨 `:art:` - 代码格式
- ⚡️ `:zap:` - 性能优化
- ♻️ `:recycle:` - 重构
- 🔒 `:lock:` - 安全相关

### 分支命名规范

- `feature/` - 新功能
- `bugfix/` - Bug 修复
- `hotfix/` - 紧急修复
- `refactor/` - 重构
- `docs/` - 文档更新

### 工作流程

1. **开始工作前** - 拉取最新代码
2. **创建分支** - 从 main 创建功能分支
3. **频繁提交** - 小步提交，便于回滚
4. **推送前整理** - 使用 rebase 整理提交历史
5. **创建 PR** - 详细描述改动内容
6. **代码审查** - 根据反馈修改
7. **合并代码** - 合并到 main 分支

## 注意事项

1. **不要修改已推送的历史** - 除非你知道自己在做什么
2. **频繁提交** - 小步提交比大改动更安全
3. **写好提交消息** - 清晰的提交消息便于追踪
4. **定期同步** - 避免长时间不同步导致大量冲突
5. **备份重要改动** - 在进行危险操作前先备份

## 组合使用基础工具

这个 Skill 展示了如何结合 Git 和基础工具：

- **read** - 读取文件查看改动
- **edit** - 修改代码修复 bug
- **bash** - 执行 Git 命令
- **write** - 创建新文件

通过组合这些工具和 Git 命令，可以完成任何版本控制任务！
