# StrongClaw 使用指南

## 快速开始

### 1. 设置 API Key

StrongClaw 支持多个模型提供商，选择一个设置即可：

```bash
# 推荐：Google Gemini（免费额度大）
export GOOGLE_API_KEY=your-key

# 或：DeepSeek（国内速度快，价格低）
export DEEPSEEK_API_KEY=your-key

# 或：Qwen（国内速度快）
export QWEN_API_KEY=your-key

# 或：Anthropic Claude（性能强）
export ANTHROPIC_API_KEY=your-key

# 或：OpenRouter（一个 Key 访问所有模型）
export OPENROUTER_API_KEY=your-key
```

详细配置请查看 [模型配置文档](MODELS.md)

或者创建 `.env` 文件：

```bash
# 选择一个或多个提供商
GOOGLE_API_KEY=your-key
DEEPSEEK_API_KEY=your-key
QWEN_API_KEY=your-key
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动 CLI

```bash
# 方式 1：自动检测可用模型
npm run dev

# 方式 2：指定模型
npm run dev -- --model gemini-2.0-flash --provider google

# 方式 3：使用 DeepSeek
npm run dev -- --model deepseek-chat --provider deepseek

# 方式 4：详细日志模式
npm run dev:verbose
```

### 4. 快速演示

```bash
./demo.sh
```

---

## 命令行参数

```bash
npm run dev -- [选项]

选项：
  -m, --model <model>        指定模型名称
  -p, --provider <provider>  指定提供商
  -v, --verbose              启用详细日志
  -h, --help                 显示帮助
```

### 示例

```bash
# 使用 Gemini
npm run dev -- --model gemini-2.0-flash --provider google

# 使用 DeepSeek
npm run dev -- --model deepseek-chat --provider deepseek

# 使用 Qwen
npm run dev -- --model qwen-plus --provider qwen

# 使用 OpenRouter（可以访问任何模型）
npm run dev -- --model anthropic/claude-sonnet-4 --provider openrouter
```

---

## 使用示例

### 基础对话

```
🦅 > 列出当前目录的文件

🤔 思考中...

🦅 StrongClaw:

当前目录包含以下文件：
- package.json
- tsconfig.json
- README.md
- src/
- test/
- docs/
```

### 文件操作

```
🦅 > 创建一个 hello.txt 文件，内容是 "Hello, StrongClaw!"

🤔 思考中...

🦅 StrongClaw:

已创建文件 hello.txt，内容如下：
Hello, StrongClaw!
```

### 代码分析

```
🦅 > 帮我分析一下 package.json

🤔 思考中...

🦅 StrongClaw:

这是一个 TypeScript 项目，主要依赖：
- @mariozechner/pi-coding-agent - 核心 Agent 引擎
- typescript - TypeScript 编译器
- tsx - TypeScript 执行器

项目名称：strongclaw
版本：0.1.0
```

---

## CLI 命令

### 内置命令

- `/help` - 显示帮助信息
- `/info` - 显示会话信息
- `/clear` - 清屏
- `/exit` - 退出程序

### 使用示例

```
🦅 > /help

📖 StrongClaw CLI 帮助

命令：
  /help    - 显示此帮助信息
  /info    - 显示会话信息
  /clear   - 清屏
  /exit    - 退出程序
```

---

## 核心理念

### 1. 极简工具

StrongClaw 只有 4 个基础工具：

- `read` - 读取文件
- `write` - 写入文件
- `edit` - 编辑文件
- `bash` - 执行命令

但通过无限组合，可以完成任何任务。

### 2. 自然对话

你不需要学习复杂的命令语法，只需要用自然语言描述你的需求：

```
✅ "列出当前目录的文件"
✅ "帮我分析一下 package.json"
✅ "创建一个 hello.txt 文件"
✅ "查找所有 .ts 文件"
```

### 3. 智能执行

StrongClaw 会自动：
- 选择合适的工具
- 组合多个工具完成复杂任务
- 处理错误和异常

---

## 常见问题

### Q: 如何退出 CLI？

A: 输入 `/exit` 或按 `Ctrl+C`

### Q: 如何查看详细日志？

A: 使用 `npm run dev:verbose`

### Q: 支持哪些模型？

A: 默认使用 `claude-sonnet-4`，可以在代码中修改

### Q: 如何添加新功能？

A: StrongClaw 通过 Skills 扩展功能，只需要编写 Markdown 文档

---

## 下一步

- 查看 [核心思想文档](docs/PHILOSOPHY.md)
- 查看 [开发日志](CHANGELOG.md)
- 开始使用 StrongClaw！

---

## 技术支持

如果遇到问题，请检查：

1. API Key 是否正确设置
2. 网络连接是否正常
3. 依赖是否正确安装

需要帮助？查看项目文档或提交 Issue。
