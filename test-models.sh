#!/bin/bash

# 测试多模型支持

echo "🧪 测试 StrongClaw 多模型支持"
echo ""

# 测试帮助信息
echo "1️⃣ 测试帮助信息..."
npm run dev -- --help
echo ""

# 测试模型检测
echo "2️⃣ 测试模型检测..."
echo ""

if [ -n "$GOOGLE_API_KEY" ]; then
    echo "✅ Google API Key 已设置"
fi

if [ -n "$DEEPSEEK_API_KEY" ]; then
    echo "✅ DeepSeek API Key 已设置"
fi

if [ -n "$QWEN_API_KEY" ]; then
    echo "✅ Qwen API Key 已设置"
fi

if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "✅ Anthropic API Key 已设置"
fi

if [ -n "$OPENROUTER_API_KEY" ]; then
    echo "✅ OpenRouter API Key 已设置"
fi

echo ""
echo "✨ 多模型支持测试完成！"
echo ""
echo "使用示例："
echo "  npm run dev                                    # 自动检测"
echo "  npm run dev -- --model gemini-2.0-flash        # 使用 Gemini"
echo "  npm run dev -- --model deepseek-chat           # 使用 DeepSeek"
echo "  npm run dev -- --provider openrouter           # 使用 OpenRouter"
