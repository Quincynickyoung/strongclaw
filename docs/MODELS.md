# StrongClaw 模型配置文档

## 概述

StrongClaw 支持多个主流 LLM 提供商，你可以根据需求选择最合适的模型。

**最后更新：** 2026-03-04

---

## 支持的提供商

### 1. Anthropic Claude

**官方网站：** https://www.anthropic.com

**最新模型（2026）：**
- `claude-opus-4.6` - 最强性能，适合复杂任务
- `claude-sonnet-4.6` - 平衡性能和成本（推荐）
- `claude-haiku-4.5` - 最快速度，适合简单任务

**配置方式：**
```bash
export ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**使用：**
```bash
npm run dev -- --model claude-sonnet-4.6 --provider anthropic
```

**价格：** ⭐️⭐️⭐️ 中等
**推荐场景：** 复杂推理、代码生成、长文本理解

**参考：** [Claude API 文档](https://gptproto.com/blog/anthropic-api)

---

### 2. Google Gemini

**官方网站：** https://ai.google.dev

**最新模型（2026）：**
- `gemini-3.1-pro-preview` - 最强性能，高级推理能力
- `gemini-3-flash-preview` - 快速响应，性价比高（推荐）
- `gemini-3.1-flash-lite-preview` - 轻量级，超快速度
- `gemini-2.5-pro` - 稳定版本
- `gemini-2.5-flash` - 稳定快速版本

**特殊模型：**
- `gemini-2.5-computer-use-preview` - 浏览器自动化
- `deep-research-pro-preview` - 多步骤研究
- `gemini-3-pro-image-preview` - 图像生成

**配置方式：**
```bash
export GOOGLE_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model gemini-3-flash-preview --provider google
```

**价格：** ⭐️⭐️⭐️⭐️⭐️ 免费额度大
**推荐场景：** 新手、日常使用、多模态任务

**参考：** [Gemini API 文档](https://ai.google.dev/gemini-api/docs/models)

---

### 3. DeepSeek

**官方网站：** https://platform.deepseek.com

**最新模型（2026）：**
- `deepseek-v3.2-exp` - 实验版本，最新特性
- `deepseek-r1` - 推理增强版本（推荐）
- `deepseek-chat` - 通用对话
- `deepseek-coder` - 代码专用

**配置方式：**
```bash
export DEEPSEEK_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model deepseek-r1 --provider deepseek
```

**价格：** ⭐️⭐️⭐️⭐️⭐️ 极低价格
**推荐场景：** 国内用户、高频使用、代码任务

**参考：** [DeepSeek API 指南](https://gptproto.com/blog/deepseek-api)

---

### 4. Moonshot Kimi

**官方网站：** https://platform.moonshot.cn

**最新模型（2026）：**
- `kimi-k2.5` - 最新版本，多模态支持（推荐）
- `kimi-k2-thinking` - 思维链推理
- `moonshot-v1-128k` - 超长上下文（128K）
- `moonshot-v1-32k` - 长上下文（32K）

**配置方式：**
```bash
export MOONSHOT_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model kimi-k2.5 --provider moonshot
```

**价格：** ⭐️⭐️⭐️⭐️ 性价比高
**推荐场景：** 长文本处理、文档分析、多模态任务

**参考：** [Kimi K2.5 API 指南](https://modelslab.com/blog/llm/kimi-k2-5-api-guide-developers-2026)

---

### 5. Alibaba Qwen

**官方网站：** https://dashscope.aliyun.com

**最新模型（2026）：**
- `qwen3.5` - 最新版本，原生多模态 Agent（推荐）
- `qwen3` - 稳定版本
- `qwen-max` - 最强性能
- `qwen-plus` - 平衡版本
- `qwen-turbo` - 快速响应

**配置方式：**
```bash
export QWEN_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model qwen3.5 --provider qwen
```

**价格：** ⭐️⭐️⭐️⭐️ 国内优惠
**推荐场景：** 中文任务、Agent 应用、多模态

**参考：** [Qwen3.5 发布](https://www.cnbc.com/2026/02/17/china-alibaba-qwen-ai-agent-latest-model.html)

---

### 6. OpenRouter

**官方网站：** https://openrouter.ai

**特点：** 一个 API Key 访问 100+ 模型

**热门模型：**
- `anthropic/claude-opus-4.6` - Claude 最强版本
- `google/gemini-3-flash-preview` - Gemini 最新版本
- `deepseek/deepseek-r1` - DeepSeek 推理版本
- `meta-llama/llama-3.3-70b` - Llama 最新版本
- `mistralai/mistral-large` - Mistral 最强版本

**配置方式：**
```bash
export OPENROUTER_API_KEY=sk-or-xxxxx
```

**使用：**
```bash
npm run dev -- --model anthropic/claude-sonnet-4.6 --provider openrouter
```

**价格：** ⭐️⭐️⭐️⭐️ 按使用付费
**推荐场景：** 需要多模型、实验不同模型、一站式服务

**参考：** [OpenRouter 模型列表](https://openrouter.ai/models)

---

### 7. Together AI

**官方网站：** https://www.together.ai

**特点：** 专注开源模型

**热门模型：**
- `meta-llama/Llama-3.3-70B-Instruct` - Llama 最新版本
- `mistralai/Mixtral-8x22B-Instruct` - Mixtral 最强版本
- `Qwen/Qwen2.5-72B-Instruct` - Qwen 开源版本
- `deepseek-ai/DeepSeek-V3` - DeepSeek 开源版本

**配置方式：**
```bash
export TOGETHER_API_KEY=your-api-key
```

**使用：**
```bash
npm run dev -- --model meta-llama/Llama-3.3-70B-Instruct --provider together
```

**价格：** ⭐️⭐️⭐️⭐️ 开源模型优惠
**推荐场景：** 开源模型、实验研究、自定义部署

---

## 模型对比

### 性能对比

| 提供商 | 最新旗舰模型 | 推理能力 | 代码能力 | 多模态 | 价格 |
|--------|-------------|---------|---------|--------|------|
| **Anthropic** | Claude Opus 4.6 | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️ |
| **Google** | Gemini 3.1 Pro | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ |
| **DeepSeek** | DeepSeek R1 | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ |
| **Moonshot** | Kimi K2.5 | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ |
| **Qwen** | Qwen3.5 | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️⭐️ | ⭐️⭐️⭐️⭐️ |

### 使用场景推荐

**新手入门：**
- Google Gemini 3 Flash（免费额度大）
- DeepSeek R1（价格低）

**专业开发：**
- Claude Opus 4.6（最强推理）
- DeepSeek Coder（代码专用）

**国内用户：**
- DeepSeek R1（速度快，价格低）
- Qwen3.5（中文好，Agent 能力强）

**多模态任务：**
- Gemini 3.1 Pro（图像、视频、音频）
- Qwen3.5（原生多模态 Agent）

**长文本处理：**
- Kimi K2.5（多模态 + 长上下文）
- Gemini 2.5 Pro（2M 上下文）

**实验研究：**
- OpenRouter（访问所有模型）
- Together AI（开源模型）

---

## 价格对比（2026 年 3 月）

### 输入价格（每百万 tokens）

| 提供商 | 模型 | 价格 |
|--------|------|------|
| DeepSeek | deepseek-r1 | $0.14 |
| Google | gemini-3-flash | $0.15 |
| Moonshot | kimi-k2.5 | $0.20 |
| Qwen | qwen3.5 | $0.30 |
| Anthropic | claude-sonnet-4.6 | $3.00 |
| Anthropic | claude-opus-4.6 | $15.00 |

### 输出价格（每百万 tokens）

| 提供商 | 模型 | 价格 |
|--------|------|------|
| DeepSeek | deepseek-r1 | $0.28 |
| Google | gemini-3-flash | $0.60 |
| Moonshot | kimi-k2.5 | $0.40 |
| Qwen | qwen3.5 | $0.60 |
| Anthropic | claude-sonnet-4.6 | $15.00 |
| Anthropic | claude-opus-4.6 | $75.00 |

**注：** 价格可能变动，请查看官方网站获取最新价格。

---

## 快速开始

### 1. 选择提供商

根据你的需求选择一个提供商并获取 API Key。

### 2. 设置环境变量

```bash
# 方式 1：直接设置
export GOOGLE_API_KEY=your-key

# 方式 2：使用 .env 文件
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

### 3. 启动 StrongClaw

```bash
# 自动检测可用模型
npm run dev

# 指定模型
npm run dev -- --model gemini-3-flash-preview --provider google

# 查看可用模型
npm run dev
# 然后输入 /models
```

---

## 常见问题

### Q: 我应该选择哪个模型？

A: 根据场景选择：
- **新手**：Gemini 3 Flash（免费额度大）
- **国内**：DeepSeek R1（速度快，价格低）
- **专业**：Claude Opus 4.6（最强推理）
- **代码**：DeepSeek Coder（代码专用）
- **多模态**：Gemini 3.1 Pro 或 Qwen3.5

### Q: 如何切换模型？

A:
```bash
# 方式 1：命令行参数
npm run dev -- --model deepseek-r1 --provider deepseek

# 方式 2：在 CLI 中使用 /models 命令查看可用模型
```

### Q: 支持本地模型吗？

A: 即将支持：
- Ollama（本地运行）
- LM Studio（本地运行）
- vLLM（自部署）

### Q: 如何获取 API Key？

A: 访问各提供商官网：
- Anthropic: https://console.anthropic.com/
- Google: https://ai.google.dev/
- DeepSeek: https://platform.deepseek.com/
- Moonshot: https://platform.moonshot.cn/
- Qwen: https://dashscope.aliyun.com/
- OpenRouter: https://openrouter.ai/
- Together: https://www.together.ai/

---

## 参考资源

- [Anthropic Claude API](https://gptproto.com/blog/anthropic-api)
- [Google Gemini Models](https://ai.google.dev/gemini-api/docs/models)
- [DeepSeek API Guide](https://gptproto.com/blog/deepseek-api)
- [Kimi K2.5 API](https://modelslab.com/blog/llm/kimi-k2-5-api-guide-developers-2026)
- [Qwen3.5 Release](https://www.cnbc.com/2026/02/17/china-alibaba-qwen-ai-agent-latest-model.html)
- [OpenRouter Models](https://openrouter.ai/models)

---

**最后更新：** 2026-03-04
**维护者：** StrongClaw Team
