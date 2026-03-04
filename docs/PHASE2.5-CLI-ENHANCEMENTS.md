# Phase 2.5: CLI 增强功能

## 概述

在 Phase 2 Gateway 层完成后，我们对 CLI 进行了全面增强，提升用户体验和可用性。

## 新增功能

### 1. 消息系统 (`cli-messages.ts`)

统一管理所有 CLI 消息，包括：

- **欢迎消息**: 美观的启动界面
- **帮助信息**: 完整的命令列表和使用说明
- **会话信息模板**: 显示当前配置
- **随机提示**: 启动时显示随机使用提示
- **使用示例**: 按类别组织的示例命令

### 2. 配置管理 (`config-manager.ts`)

用户配置持久化系统：

**配置文件位置**: `~/.strongclaw/config.json`

**支持的配置项**:
```typescript
{
  defaultProvider?: ModelProvider;  // 默认模型提供商
  defaultModel?: string;            // 默认模型
  verbose?: boolean;                // 详细日志
  autoCommit?: boolean;             // 自动提交
  theme?: 'light' | 'dark';         // 主题
  language?: 'zh' | 'en';           // 语言
}
```

**功能**:
- `loadConfig()` - 加载用户配置
- `saveConfig()` - 保存配置
- `updateConfig()` - 更新部分配置
- `resetConfig()` - 重置配置
- `showConfig()` - 显示当前配置

### 3. 历史记录 (`history-manager.ts`)

对话历史记录系统：

**历史文件位置**: `~/.strongclaw/history/conversations.jsonl`

**记录格式**:
```typescript
{
  timestamp: string;        // ISO 时间戳
  user: string;            // 用户输入
  assistant: string;       // AI 回复
  workingDirectory: string; // 工作目录
}
```

**功能**:
- `recordConversation()` - 记录对话
- `loadHistory()` - 加载历史记录
- `clearHistory()` - 清空历史
- `showHistory()` - 显示最近的对话

### 4. 增强的 CLI 命令

新增命令：

| 命令 | 功能 |
|------|------|
| `/examples` | 显示使用示例 |
| `/skills` | 显示可用 Skills |
| `/config` | 显示当前配置 |
| `/history` | 显示对话历史 |
| `/clear-history` | 清空对话历史 |

## 使用方式

### 查看配置

```bash
# 在 CLI 中
/config
```

### 查看历史记录

```bash
# 在 CLI 中
/history
```

### 查看使用示例

```bash
# 在 CLI 中
/examples
```

### 手动编辑配置

```bash
# 编辑配置文件
vi ~/.strongclaw/config.json
```

示例配置：
```json
{
  "defaultProvider": "openrouter",
  "defaultModel": "anthropic/claude-opus-4-20250514",
  "verbose": false,
  "language": "zh"
}
```

## 技术实现

### 配置加载流程

1. CLI 启动时自动加载 `~/.strongclaw/config.json`
2. 命令行参数优先级高于配置文件
3. 配置文件优先级高于默认值

### 历史记录格式

使用 JSONL (JSON Lines) 格式：
- 每行一个 JSON 对象
- 便于追加和流式处理
- 支持大量历史记录

### 目录结构

```
~/.strongclaw/
├── config.json              # 用户配置
└── history/
    └── conversations.jsonl  # 对话历史
```

## 优势

1. **持久化配置**: 用户不需要每次都指定模型和提供商
2. **历史记录**: 可以回顾之前的对话
3. **更好的帮助系统**: 分类清晰的命令和示例
4. **随机提示**: 帮助用户发现新功能
5. **模块化设计**: 消息、配置、历史分离，易于维护

## 下一步

- [ ] 添加配置命令 (`/set-config`)
- [ ] 支持历史搜索
- [ ] 支持多语言切换
- [ ] 添加主题系统
- [ ] 集成到 Electron GUI

## 相关文件

- `src/cli-messages.ts` - 消息系统
- `src/config-manager.ts` - 配置管理
- `src/history-manager.ts` - 历史记录
- `src/cli.ts` - CLI 主文件（已更新）
