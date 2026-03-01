#!/bin/bash

# StrongClaw 快速演示脚本

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              🦅 StrongClaw 快速演示                        ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 检查 API Key（支持多个提供商）
API_KEY_FOUND=false

if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "✅ 检测到 Anthropic API Key"
    API_KEY_FOUND=true
fi

if [ -n "$GOOGLE_API_KEY" ]; then
    echo "✅ 检测到 Google API Key"
    API_KEY_FOUND=true
fi

if [ -n "$MOONSHOT_API_KEY" ]; then
    echo "✅ 检测到 Moonshot API Key"
    API_KEY_FOUND=true
fi

if [ -n "$DEEPSEEK_API_KEY" ]; then
    echo "✅ 检测到 DeepSeek API Key"
    API_KEY_FOUND=true
fi

if [ -n "$QWEN_API_KEY" ]; then
    echo "✅ 检测到 Qwen API Key"
    API_KEY_FOUND=true
fi

if [ -n "$OPENROUTER_API_KEY" ]; then
    echo "✅ 检测到 OpenRouter API Key"
    API_KEY_FOUND=true
fi

if [ -n "$TOGETHER_API_KEY" ]; then
    echo "✅ 检测到 Together AI API Key"
    API_KEY_FOUND=true
fi

if [ "$API_KEY_FOUND" = false ]; then
    echo "❌ 错误：未检测到任何 API Key"
    echo ""
    echo "请设置以下环境变量之一："
    echo "  export ANTHROPIC_API_KEY=your-key    # Anthropic Claude"
    echo "  export GOOGLE_API_KEY=your-key       # Google Gemini（推荐）"
    echo "  export MOONSHOT_API_KEY=your-key     # Moonshot Kimi"
    echo "  export DEEPSEEK_API_KEY=your-key     # DeepSeek（推荐）"
    echo "  export QWEN_API_KEY=your-key         # Alibaba Qwen"
    echo "  export OPENROUTER_API_KEY=your-key   # OpenRouter（推荐）"
    echo "  export TOGETHER_API_KEY=your-key     # Together AI"
    echo ""
    echo "详细配置请查看: docs/MODELS.md"
    echo ""
    exit 1
fi

echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo ""
fi

echo "🧪 运行基础测试..."
echo ""
npm test
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ StrongClaw 已就绪！"
echo ""
echo "启动方式："
echo "  npm run dev                                    # 自动检测模型"
echo "  npm run dev -- --model gemini-2.0-flash        # 指定模型"
echo "  npm run dev -- --provider google               # 指定提供商"
echo "  npm run dev:verbose                            # 详细日志"
echo ""
echo "核心理念："
echo "  • 4 个基础工具：read, write, edit, bash"
echo "  • Skills = 知识库，不是工具库"
echo "  • 最大化 Prompt Caching"
echo "  • 不和模型对赌"
echo ""
echo "现在启动 CLI..."
echo ""

# 启动 CLI
npm run dev
