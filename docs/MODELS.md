# StrongClaw 模型配置文档

## 概述

StrongClaw 支持多个主流 LLM 提供商，你可以根据需求选择最合适的模型。

---

## 支持的提供商

### 1. Anthropic Claude

**官方网站：** https://www.anthropic.com

**支持的模型：**
- `claude-sonnet-4` - 平衡性能和成本（推荐）
- `claude-opus-4` - 最强性能
- `claude-haiku-4` - 最快速度

**配置方式：**
```bash
export ANTHROPIC_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev
# 默认使用 claude-sonnet-4
```

---

### 2. Google Gemini

**官方网站：** https://ai.google.dev

**支持的模型：**
- `gemini-2.0-flash` - 快速响应（推荐）
- `gemini-pro` - 高性能
- `gemini-ultra` - 最强性能

**配置方式：**
```bash
export GOOGLE_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model gemini-2.0-flash
```

---

### 3. Moonshot Kimi

**官方网站：** https://platform.moonshot.cn

**支持的模型：**
- `moonshot-v1-8k` - 8K 上下文
- `moonshot-v1-32k` - 32K 上下文（推荐）
- `moonshot-v1-128k` - 128K 上下文

**配置方式：**
```bash
export MOONSHOT_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model moonshot-v1-32k
```

---

### 4. DeepSeek

**官方网站：** https://platform.deepseek.com

**支持的模型：**
- `deepseek-chat` - 通用对话（推荐）
- `deepseek-coder` - 代码专用

**配置方式：**
```bash
export DEEPSEEK_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model deepseek-chat
```

---

### 5. Alibaba Qwen

**官方网站：** https://dashscope.aliyun.com

**支持的模型：**
- `qwen-turbo` - 快速响应
- `qwen-plus` - 平衡性能（推荐）
- `qwen-max` - 最强性能

**配置方式：**
```bash
export QWEN_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model qwen-plus
```

---

### 6. OpenRouter（聚合服务商）

**官方网站：** https://openrouter.ai

**支持的模型：** 100+ 模型，包括：
- `anthropic/claude-sonnet-4`
- `google/gemini-2.0-flash`
- `meta-llama/llama-3.1-70b`
- `mistralai/mistral-large`
- 等等...

**配置方式：**
```bash
export OPENROUTER_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model anthropic/claude-sonnet-4 --provider openrouter
```

**优势：**
- 一个 API Key 访问所有模型
- 自动负载均衡
- 价格透明

---

### 7. Together AI

**官方网站：** https://together.ai

**支持的模型：** 开源模型，包括：
- `meta-llama/Llama-3-70b-chat-hf`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- `Qwen/Qwen2-72B-Instruct`

**配置方式：**
```bash
export TOGETHER_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model meta-llama/Llama-3-70b-chat-hf --provider together
```

---

## 配置文件方式

除了环境变量，你也可以使用配置文件：

### 创建配置文件

```bash
# 在项目根目录创建 .env 文件
cat > .env << EOF
# 选择一个或多个提供商

# Anthropic
ANTHROPIC_API_KEY=your-key

# Google
GOOGLE_API_KEY=your-key

# Moonshot
MOONSHOT_API_KEY=your-key

# DeepSeek
DEEPSEEK_API_KEY=your-key

# Qwen
QWEN_API_KEY=your-key

# OpenRouter（推荐）
OPENROUTER_API_KEY=your-key

# Together AI
TOGETHER_API_KEY=your-key

# 默认模型
DEFAULT_MODEL=gemini-2.0-flash
DEFAULT_PROVIDER=google
EOF
```

### 使用配置文件

```bash
# 自动读取 .env 文件
npm run dev
```

---

## 模型选择建议

### 按场景选择

| 场景 | 推荐模型 | 原因 |
|------|---------|------|
| 日常开发 | gemini-2.0-flash | 免费额度大，速度快 |
| 复杂任务 | claude-sonnet-4 | 性能强，理解力好 |
| 代码生成 | deepseek-coder | 代码专用，效果好 |
| 中文对话 | qwen-plus | 中文理解好 |
| 预算有限 | openrouter | 价格透明，可选择便宜模型 |

### 按成本选择

| 模型 | 输入价格 | 输出价格 | 性价比 |
|------|---------|---------|--------|
| gemini-2.0-flash | 免费额度 | 免费额度 | ⭐️⭐️⭐️⭐️⭐️ |
| deepseek-chat | $0.14/M | $0.28/M | ⭐️⭐️⭐️⭐️⭐️ |
| qwen-plus | ¥0.8/M | ¥2.0/M | ⭐️⭐️⭐️⭐️ |
| moonshot-v1-32k | ¥12/M | ¥12/M | ⭐️⭐️⭐️ |
| claude-sonnet-4 | $3/M | $15/M | ⭐️⭐️⭐️ |

---

## 快速开始

### 方式 1：使用 Gemini（推荐新手）

```bash
# 1. 获取 API Key（免费）
# 访问 https://ai.google.dev

# 2. 设置环境变量
export GOOGLE_API_KEY=your-key

# 3. 启动
npm run dev -- --model gemini-2.0-flash
```

### 方式 2：使用 OpenRouter（推荐进阶）

```bash
# 1. 获取 API Key
# 访问 https://openrouter.ai

# 2. 设置环境变量
export OPENROUTER_API_KEY=your-key

# 3. 启动（可以使用任何模型）
npm run dev -- --model google/gemini-2.0-flash --provider openrouter
```

### 方式 3：使用国内模型

```bash
# DeepSeek（推荐）
export DEEPSEEK_API_KEY=your-key
npm run dev -- --model deepseek-chat

# 或 Qwen
export QWEN_API_KEY=your-key
npm run dev -- --model qwen-plus

# 或 Kimi
export MOONSHOT_API_KEY=your-key
npm run dev -- --model moonshot-v1-32k
```

---

## 常见问题

### Q: 我应该选择哪个模型？

A:
- **新手**：Gemini（免费额度大）
- **国内用户**：DeepSeek 或 Qwen（速度快，价格低）
- **追求性能**：Claude Sonnet 4（理解力强）
- **代码任务**：DeepSeek Coder（代码专用）

### Q: OpenRouter 和直接调用有什么区别？

A:
- **OpenRouter**：一个 Key 访问所有模型，自动负载均衡
- **直接调用**：需要多个 Key，但可能更稳定

### Q: 如何切换模型？

A:
```bash
# 方式 1：命令行参数
npm run dev -- --model gemini-2.0-flash

# 方式 2：修改 .env 文件
DEFAULT_MODEL=gemini-2.0-flash

# 方式 3：在 CLI 中使用命令（即将支持）
🦅 > /model gemini-2.0-flash
```

### Q: 支持本地模型吗？

A: 即将支持，计划支持：
- Ollama（本地运行）
- LM Studio（本地运行）
- vLLM（自部署）

---

## 技术实现

StrongClaw 使用 `pi-ai` 包的统一接口，支持多个提供商：

```typescript
import { createModel } from '@mariozechner/pi-ai';

// 自动检测可用的 API Key 并选择模型
const model = createModel({
  provider: 'google',  // 或 'anthropic', 'openrouter' 等
  model: 'gemini-2.0-flash',
});
```

---

## 下一步

- 查看 [使用指南](USAGE.md)
- 查看 [核心思想](PHILOSOPHY.md)
- 开始使用 StrongClaw！
