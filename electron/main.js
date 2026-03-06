import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置存储
const store = new Store({
  name: 'strongclaw-config',
  defaults: {
    windowBounds: { width: 1200, height: 800 },
    theme: 'dark',
    model: 'gemini-3-flash',
    provider: 'google'
  }
});

let mainWindow;

function createWindow() {
  const bounds = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#1a1a1a',
    show: false
  });

  // 加载渲染进程
  mainWindow.loadFile(join(__dirname, 'renderer', 'index.html'));

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 保存窗口大小
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', bounds);
  });

  // 开发模式下打开 DevTools
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

// IPC 处理器
ipcMain.handle('get-config', () => {
  return store.store;
});

ipcMain.handle('set-config', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('send-message', async (event, message) => {
  // TODO: 集成 Gateway 层处理消息
  return {
    role: 'assistant',
    content: 'Electron GUI is under development...'
  };
});

// 应用生命周期
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

