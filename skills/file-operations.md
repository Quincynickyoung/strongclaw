# File Operations Skill

这个 Skill 提供了高级文件操作能力。

## 能力

### 1. 批量文件操作

**查找并替换多个文件中的内容：**

```bash
# 1. 使用 grep 查找包含特定内容的文件
grep -r "old_text" .

# 2. 对每个文件使用 edit 工具替换内容
# 使用 edit 工具，指定 old_string 和 new_string
```

**批量重命名文件：**

```bash
# 1. 列出需要重命名的文件
ls *.txt

# 2. 使用 bash 工具批量重命名
for file in *.txt; do
  mv "$file" "${file%.txt}.md"
done
```

### 2. 文件分析

**统计代码行数：**

```bash
# 统计所有 TypeScript 文件的行数
find . -name "*.ts" -type f -exec wc -l {} + | sort -n
```

**查找大文件：**

```bash
# 查找大于 1MB 的文件
find . -type f -size +1M -exec ls -lh {} \; | sort -k5 -h
```

### 3. 文件备份

**创建备份：**

```bash
# 备份重要文件
cp important.txt important.txt.backup.$(date +%Y%m%d)
```

**批量备份：**

```bash
# 备份所有配置文件
for file in *.conf; do
  cp "$file" "$file.backup"
done
```

### 4. 文件比较

**比较两个文件：**

```bash
# 使用 diff 比较
diff file1.txt file2.txt

# 或使用 git diff（如果在 git 仓库中）
git diff file1.txt file2.txt
```

### 5. 文件压缩和解压

**压缩文件：**

```bash
# 压缩目录
tar -czf archive.tar.gz directory/

# 压缩单个文件
gzip file.txt
```

**解压文件：**

```bash
# 解压 tar.gz
tar -xzf archive.tar.gz

# 解压 zip
unzip archive.zip
```

## 使用示例

### 示例 1：清理临时文件

```bash
# 查找所有 .tmp 文件
find . -name "*.tmp" -type f

# 删除它们
find . -name "*.tmp" -type f -delete
```

### 示例 2：代码格式化

```bash
# 格式化所有 TypeScript 文件
find . -name "*.ts" -type f -exec npx prettier --write {} \;
```

### 示例 3：批量添加文件头

对于每个文件：

1. 使用 `read` 工具读取文件内容
2. 使用 `write` 工具写入新内容（文件头 + 原内容）

## 注意事项

1. **备份重要文件** - 在进行批量操作前，先备份
2. **测试命令** - 先在小范围测试，确认无误后再大规模执行
3. **使用 -i 参数** - 对于删除操作，使用交互模式确认
4. **检查权限** - 确保有足够的权限执行操作

## 组合使用基础工具

这个 Skill 展示了如何组合使用 4 个基础工具：

- **read** - 读取文件内容
- **write** - 写入新文件
- **edit** - 修改现有文件
- **bash** - 执行复杂的文件操作命令

通过组合这些工具，可以完成任何文件操作任务！
