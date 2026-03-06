# Phase 3: Electron GUI

## 概述

StrongClaw Electron GUI 是一个现代化的桌面应用程序，为 StrongClaw AI Agent 平台提供图形界面。

## 功能特性

### 已实现

- ✅ 现代化的深色主题界面
- ✅ 侧边栏会话管理
- ✅ 实时聊天界面
- ✅ 模型选择器
- ✅ 设置面板
- ✅ 配置持久化（electron-store）
- ✅ 安全的 IPC 通信

### 计划中

- [ ] 集成 Gateway 层
- [ ] 多会话支持
- [ ] 历史记录查看
- [ ] 文件拖拽上传
- [ ] Markdown 渲染
- [ ] 代码高亮
- [ ] 流式消息显示
- [ ] 权限对话框
- [ ] 快捷键支持
- [ ] 系统托盘

## 架构设计

```
electron/
├── main.js              # 主进程
├── preload/
│   └── preload.js       # Preload 脚本（安全桥接）
└── renderer/
    ├── index.html       # 渲染进程 HTML
    ├── styles.css       # 样式文件
    └── app.js           # 渲染进程逻辑
```

### 主进程 (main.js)

负责：
- 创建和管理窗口
- IPC 通信处理
- 配置管理（electron-store）
- 应用生命周期管理

### Preload 脚本 (preload.js)

负责：
- 安全地暴露 API 给渲染进程
- 使用 contextBridge 隔离
- 防止直接访问 Node.js API

### 渲染进程 (renderer/)

负责：
- 用户界面渲染
- 用户交互处理
- 通过 IPC 与主进程通信

## 使用方式

### 开发模式

```bash
# 启动 Electron（开发模式，带 DevTools）
npm run electron:dev
```

### 生产模式

```bash
# 构建应用
npm run build:electron

# 启动应用
npm run electron
```

## 界面说明

### 侧边栏

- **会话列表**: 显示所有对话会话
- **新建按钮**: 创建新的对话会话
- **设置按钮**: 打开设置面板

### 主内容区

- **顶部栏**:
  - 模型选择器：切换不同的 AI 模型
  - 清空按钮：清空当前对话

- **聊天区域**:
  - 消息显示区：显示对话历史
  - 输入框：输入消息（Enter 发送，Shift+Enter 换行）
  - 发送按钮：发送消息

### 设置面板

- **主题设置**: 深色/浅色主题切换
- **默认模型**: 设置默认使用的模型
- **API Keys**: 配置各提供商的 API Key

## 技术栈

- **Electron**: 跨平台桌面应用框架
- **electron-store**: 配置持久化
- **原生 JavaScript**: 无框架依赖，轻量快速
- **CSS**: 现代化样式，支持深色主题

## 安全性

### Context Isolation

使用 Electron 的 Context Isolation 特性：
- 渲染进程无法直接访问 Node.js API
- 通过 contextBridge 安全暴露 API
- 防止 XSS 攻击

### IPC 通信

所有通信通过 IPC 进行：
- 主进程 ↔ 渲染进程
- 使用 `ipcRenderer.invoke` 进行异步调用
- 类型安全的消息传递

## 配置文件

配置文件位置：
- **macOS**: `~/Library/Application Support/strongclaw-config/config.json`
- **Windows**: `%APPDATA%/strongclaw-config/config.json`
- **Linux**: `~/.config/strongclaw-config/config.json`

配置内容：
```json
{
  "windowBounds": {
    "width": 1200,
    "height": 800
  },
  "theme": "dark",
  "model": "gemini-3-flash",
  "provider": "google"
}
```

## 下一步开发

### 1. 集成 Gateway 层

将 Gateway 层集成到主进程：
```javascript
import { createGateway } from '../src/gateway/index.js';

const gateway = createGateway();

ipcMain.handle('send-message', async (event, message) => {
  const session = gateway.getSession('default');
  // 处理消息...
});
```

### 2. 实现多会话

- 会话列表管理
- 会话切换
- 会话持久化

### 3. 添加 Markdown 渲染

使用 marked.js 或 markdown-it：
- 渲染 Markdown 格式的回复
- 代码高亮（highlight.js）
- 数学公式支持（KaTeX）

### 4. 流式消息

实现流式显示：
- 逐字显示 AI 回复
- 更好的用户体验
- 实时反馈

### 5. 权限对话框

实现权限请求对话框：
- 工具执行前请求权限
- 显示工具名称和参数
- 允许/拒绝/总是允许

## 开发指南

### 添加新功能

1. 在主进程添加 IPC 处理器：
```javascript
ipcMain.handle('your-function', async (event, ...args) => {
  // 处理逻辑
  return result;
});
```

2. 在 preload 暴露 API：
```javascript
contextBridge.exposeInMainWorld('strongclaw', {
  yourFunction: (...args) => ipcRenderer.invoke('your-function', ...args)
});
```

3. 在渲染进程调用：
```javascript
const result = await window.strongclaw.yourFunction(...args);
```

### 调试

开发模式会自动打开 DevTools：
```bash
npm run electron:dev
```

或在代码中手动打开：
```javascript
mainWindow.webContents.openDevTools();
```

## 常见问题

### Q: 如何修改窗口大小？

A: 编辑 `electron/main.js` 中的 `createWindow` 函数：
```javascript
mainWindow = new BrowserWindow({
  width: 1400,  // 修改宽度
  height: 900,  // 修改高度
  // ...
});
```

### Q: 如何添加新的主题？

A: 在 `electron/renderer/styles.css` 中添加新的 CSS 变量：
```css
[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  // ...
}
```

### Q: 如何打包应用？

A: 使用 electron-builder：
```bash
npm run build:electron
```

## 参考资源

- [Electron 文档](https://www.electronjs.org/docs)
- [electron-store](https://github.com/sindresorhus/electron-store)
- [electron-builder](https://www.electron.build/)

---

**状态**: 🚧 开发中
**版本**: 0.1.0
**最后更新**: 2026-03-06
