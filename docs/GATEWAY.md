# Gateway 层架构文档

## 概述

Gateway 层是 StrongClaw 的核心架构层，负责消息路由、权限控制和会话管理。

## 核心职责

### 1. 消息路由

统一的消息入口和分发机制：

```typescript
const gateway = createGateway();

// 发送消息
await gateway.sendMessage({
  id: 'msg-1',
  type: 'user',
  content: '列出当前目录的文件',
  timestamp: Date.now(),
  sessionId: 'session-1',
});
```

### 2. 权限控制

工具执行的权限管理：

```typescript
// 添加权限规则
gateway.addPermissionRule({
  toolName: 'bash',
  permission: 'ask', // 'allow' | 'deny' | 'ask'
});

// 检查权限
const permission = await gateway.checkPermission('bash', { command: 'rm -rf /' }, []);
```

### 3. 会话管理

多会话的生命周期管理：

```typescript
// 创建会话
const session = await gateway.createSession({
  sessionId: 'session-1',
  cwd: '/path/to/workspace',
  model: 'claude-sonnet-4',
});

// 获取会话
const session = gateway.getSession('session-1');

// 销毁会话
await gateway.destroySession('session-1');
```

### 4. 事件总线

统一的事件发布/订阅机制：

```typescript
// 订阅事件
gateway.on((event) => {
  console.log('Event:', event.type, event.data);
});

// 事件类型
// - session_created
// - session_destroyed
// - message_received
// - message_sent
// - permission_requested
// - permission_granted
// - permission_denied
```

---

## 架构设计

### 组件关系

```
┌─────────────────────────────────────────┐
│              Gateway                    │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │  EventBus    │  │ MessageRouter   │ │
│  └──────────────┘  └─────────────────┘ │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │ Permission   │  │ Session         │ │
│  │ Checker      │  │ Manager         │ │
│  └──────────────┘  └─────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 数据流

```
用户输入
  ↓
MessageRouter (路由消息)
  ↓
PermissionChecker (检查权限)
  ↓
SessionManager (获取会话)
  ↓
Agent Session (执行)
  ↓
EventBus (发布事件)
  ↓
响应输出
```

---

## 核心组件

### 1. EventBus

**职责：** 事件发布/订阅

**接口：**
```typescript
interface IEventBus {
  emit(event: GatewayEvent): void;
  subscribe(listener: EventListener): void;
  unsubscribe(listener: EventListener): void;
  getListenerCount(): number;
}
```

**使用示例：**
```typescript
const eventBus = new EventBus();

// 订阅
eventBus.subscribe((event) => {
  console.log(event.type, event.data);
});

// 发布
eventBus.emit({
  type: 'message_received',
  sessionId: 'session-1',
  data: message,
  timestamp: Date.now(),
});
```

### 2. PermissionChecker

**职责：** 权限检查和管理

**接口：**
```typescript
interface IPermissionChecker {
  check(toolName: string, args: any, rules: PermissionRule[]): Promise<ToolPermission>;
  addRule(rule: PermissionRule): void;
  removeRule(toolName: string): void;
  getRules(): PermissionRule[];
}
```

**预设规则：**
- `read` - 自动允许（只读操作）
- `bash` - 需要询问（除非是安全命令如 ls、pwd）
- `write` - 需要询问
- `edit` - 需要询问

**自定义规则：**
```typescript
permissionChecker.addRule({
  toolName: 'bash',
  permission: 'allow',
  condition: (args) => {
    // 只允许 git 命令
    return args.command.startsWith('git ');
  },
});
```

### 3. SessionManager

**职责：** 会话生命周期管理

**接口：**
```typescript
interface ISessionManager {
  create(config: SessionConfig): Promise<AgentSession>;
  get(sessionId: string): AgentSession | undefined;
  destroy(sessionId: string): Promise<void>;
  getAllSessionIds(): string[];
  getSessionCount(): number;
}
```

**会话配置：**
```typescript
interface SessionConfig {
  sessionId: string;
  cwd: string;
  model: string;
  skillsPath?: string;
  verbose?: boolean;
}
```

### 4. MessageRouter

**职责：** 消息路由和分发

**接口：**
```typescript
interface IMessageRouter {
  route(message: Message, session: AgentSession): Promise<void>;
  broadcast(message: Omit<Message, 'sessionId'>): Promise<void>;
}
```

**消息类型：**
- `user` - 用户消息
- `assistant` - Agent 响应
- `system` - 系统消息
- `tool_call` - 工具调用
- `tool_result` - 工具结果

---

## 使用示例

### 基础使用

```typescript
import { createGateway } from './gateway';

// 创建 Gateway
const gateway = createGateway();

// 创建会话
const session = await gateway.createSession({
  sessionId: 'my-session',
  cwd: process.cwd(),
  model: 'claude-sonnet-4',
});

// 订阅事件
gateway.on((event) => {
  if (event.type === 'message_sent') {
    console.log('Response:', event.data.content);
  }
});

// 发送消息
await gateway.sendMessage({
  id: 'msg-1',
  type: 'user',
  content: '列出当前目录的文件',
  timestamp: Date.now(),
  sessionId: 'my-session',
});
```

### 权限控制

```typescript
// 添加自定义规则
gateway.addPermissionRule({
  toolName: 'bash',
  permission: 'deny',
  condition: (args) => {
    // 禁止删除操作
    return args.command.includes('rm ');
  },
});

// 检查权限
const permission = await gateway.checkPermission(
  'bash',
  { command: 'rm file.txt' },
  []
);

if (permission === 'deny') {
  console.log('操作被拒绝');
}
```

### 多会话管理

```typescript
// 创建多个会话
await gateway.createSession({
  sessionId: 'session-1',
  cwd: '/project-1',
  model: 'claude-sonnet-4',
});

await gateway.createSession({
  sessionId: 'session-2',
  cwd: '/project-2',
  model: 'gemini-2.0-flash',
});

// 获取所有会话
const sessionIds = gateway.getAllSessionIds();
console.log('Active sessions:', sessionIds);

// 向不同会话发送消息
await gateway.sendMessage({
  id: 'msg-1',
  type: 'user',
  content: 'Task for session 1',
  timestamp: Date.now(),
  sessionId: 'session-1',
});

await gateway.sendMessage({
  id: 'msg-2',
  type: 'user',
  content: 'Task for session 2',
  timestamp: Date.now(),
  sessionId: 'session-2',
});
```

---

## 扩展 Gateway

### 自定义事件处理

```typescript
class CustomGateway extends Gateway {
  constructor() {
    super();

    // 添加自定义事件处理
    this.on((event) => {
      if (event.type === 'permission_requested') {
        this.handlePermissionRequest(event);
      }
    });
  }

  private handlePermissionRequest(event: GatewayEvent) {
    // 自定义权限请求处理逻辑
    console.log('Permission requested:', event.data);
  }
}
```

### 自定义权限策略

```typescript
class StrictPermissionChecker extends PermissionChecker {
  async check(toolName: string, args: any, rules: PermissionRule[]): Promise<ToolPermission> {
    // 默认拒绝所有操作
    if (toolName !== 'read') {
      return 'deny';
    }

    return super.check(toolName, args, rules);
  }
}
```

---

## 最佳实践

### 1. 会话管理

- 为每个用户/项目创建独立会话
- 定期清理不活跃的会话
- 使用有意义的 sessionId

### 2. 权限控制

- 默认使用 'ask' 权限
- 只对安全操作使用 'allow'
- 对危险操作使用 'deny'
- 使用 condition 函数实现细粒度控制

### 3. 事件处理

- 避免在事件处理器中执行耗时操作
- 使用异步处理避免阻塞
- 及时取消不需要的订阅

### 4. 错误处理

- 捕获并处理所有异常
- 使用事件通知错误
- 提供友好的错误消息

---

## 性能考虑

### 1. 会话缓存

SessionManager 在内存中缓存会话，避免重复创建。

### 2. 事件批处理

对于高频事件，考虑批处理以减少开销。

### 3. 权限缓存

对于相同的权限检查，可以缓存结果。

---

## 安全考虑

### 1. 权限隔离

每个会话有独立的权限规则，互不影响。

### 2. 输入验证

所有消息和参数都应该验证。

### 3. 资源限制

限制会话数量和消息大小，防止资源耗尽。

---

## 测试

运行 Gateway 测试：

```bash
npm run test:gateway
```

测试覆盖：
- ✅ 事件系统
- ✅ 权限检查
- ✅ 会话管理
- ✅ 消息路由

---

## 下一步

Gateway 层为以下功能提供了基础：

1. **Electron GUI** - 使用 Gateway 管理多个会话
2. **飞书 Bot** - 使用 Gateway 处理多用户请求
3. **Web UI** - 使用 Gateway 提供 API
4. **插件系统** - 使用事件总线扩展功能

---

## 参考

- [Gateway 源码](../src/gateway/)
- [Gateway 测试](../test/gateway.test.ts)
- [核心思想](PHILOSOPHY.md)
