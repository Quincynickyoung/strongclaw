#!/bin/bash

# StrongClaw 自动提交脚本
# 用于快速提交和推送代码变更

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 检查代码变更...${NC}"
echo ""

# 检查是否有变更
if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}✨ 没有需要提交的变更${NC}"
    exit 0
fi

# 显示变更
echo -e "${BLUE}📝 变更的文件：${NC}"
git status -s
echo ""

# 添加所有变更
echo -e "${BLUE}➕ 添加变更到暂存区...${NC}"
git add .
echo ""

# 获取提交信息（如果提供）
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    # 如果没有提供提交信息，使用默认信息
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 创建提交
echo -e "${BLUE}💾 创建提交...${NC}"
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
echo ""

# 推送到 GitHub
echo -e "${BLUE}🚀 推送到 GitHub...${NC}"
git push
echo ""

echo -e "${GREEN}✅ 提交成功！${NC}"
echo ""
echo -e "${BLUE}🔗 查看仓库：${NC} https://github.com/Quincynickyoung/strongclaw"
