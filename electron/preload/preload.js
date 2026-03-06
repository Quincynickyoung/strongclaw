import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('strongclaw', {
  // 配置管理
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (key, value) => ipcRenderer.invoke('set-config', key, value),

  // 消息发送
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),

  // 事件监听
  onMessage: (callback) => {
    ipcRenderer.on('message', (event, data) => callback(data));
  },

  onError: (callback) => {
    ipcRenderer.on('error', (event, data) => callback(data));
  }
});
