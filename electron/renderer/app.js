// 应用状态
const state = {
  messages: [],
  currentSession: null,
  config: {}
};

// DOM 元素
const elements = {
  messages: document.getElementById('messages'),
  messageInput: document.getElementById('messageInput'),
  sendBtn: document.getElementById('sendBtn'),
  clearBtn: document.getElementById('clearBtn'),
  newSessionBtn: document.getElementById('newSessionBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  settingsModal: document.getElementById('settingsModal'),
  closeSettingsBtn: document.getElementById('closeSettingsBtn'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  modelSelector: document.getElementById('modelSelector'),
  sessionList: document.getElementById('sessionList')
};

// 初始化
async function init() {
  // 加载配置
  state.config = await window.strongclaw.getConfig();

  // 设置默认模型
  if (state.config.model) {
    elements.modelSelector.value = state.config.model;
  }

  // 绑定事件
  bindEvents();

  // 监听消息
  window.strongclaw.onMessage(handleIncomingMessage);
  window.strongclaw.onError(handleError);
}

// 绑定事件
function bindEvents() {
  // 发送消息
  elements.sendBtn.addEventListener('click', sendMessage);
  elements.messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // 自动调整输入框高度
  elements.messageInput.addEventListener('input', () => {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
  });

  // 清空对话
  elements.clearBtn.addEventListener('click', clearMessages);

  // 新建会话
  elements.newSessionBtn.addEventListener('click', newSession);

  // 设置
  elements.settingsBtn.addEventListener('click', openSettings);
  elements.closeSettingsBtn.addEventListener('click', closeSettings);
  elements.saveSettingsBtn.addEventListener('click', saveSettings);

  // 模型切换
  elements.modelSelector.addEventListener('change', (e) => {
    window.strongclaw.setConfig('model', e.target.value);
  });
}

// 发送消息
async function sendMessage() {
  const content = elements.messageInput.value.trim();
  if (!content) return;

  // 添加用户消息
  addMessage('user', content);
  elements.messageInput.value = '';
  elements.messageInput.style.height = 'auto';

  // 禁用输入
  elements.sendBtn.disabled = true;
  elements.messageInput.disabled = true;

  try {
    // 发送到后端
    const response = await window.strongclaw.sendMessage(content);

    // 添加助手消息
    addMessage('assistant', response.content);
  } catch (error) {
    handleError(error.message);
  } finally {
    // 启用输入
    elements.sendBtn.disabled = false;
    elements.messageInput.disabled = false;
    elements.messageInput.focus();
  }
}

// 添加消息
function addMessage(role, content) {
  // 移除欢迎消息
  const welcome = elements.messages.querySelector('.message-welcome');
  if (welcome) {
    welcome.remove();
  }

  // 创建消息元素
  const messageEl = document.createElement('div');
  messageEl.className = `message ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = role === 'user' ? '👤' : '🦅';

  const contentEl = document.createElement('div');
  contentEl.className = 'message-content';
  contentEl.textContent = content;

  messageEl.appendChild(avatar);
  messageEl.appendChild(contentEl);

  elements.messages.appendChild(messageEl);

  // 滚动到底部
  elements.messages.scrollTop = elements.messages.scrollHeight;

  // 保存到状态
  state.messages.push({ role, content });
}

// 处理接收的消息
function handleIncomingMessage(data) {
  addMessage('assistant', data.content);
}

// 处理错误
function handleError(error) {
  const errorEl = document.createElement('div');
  errorEl.className = 'message error';
  errorEl.textContent = `错误: ${error}`;
  elements.messages.appendChild(errorEl);
}

// 清空消息
function clearMessages() {
  if (!confirm('确定要清空当前对话吗？')) return;

  state.messages = [];
  elements.messages.innerHTML = `
    <div class="message-welcome">
      <div class="welcome-icon">🦅</div>
      <h2>欢迎使用 StrongClaw</h2>
      <p>基于 Pi 哲学的 AI Agent 平台</p>
      <div class="welcome-features">
        <div class="feature">
          <span class="feature-icon">👁️</span>
          <span>读取文件</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✍️</span>
          <span>写入文件</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✏️</span>
          <span>编辑文件</span>
        </div>
        <div class="feature">
          <span class="feature-icon">🖐️</span>
          <span>执行命令</span>
        </div>
      </div>
    </div>
  `;
}

// 新建会话
function newSession() {
  clearMessages();
  // TODO: 创建新会话逻辑
}

// 打开设置
function openSettings() {
  elements.settingsModal.classList.add('show');
}

// 关闭设置
function closeSettings() {
  elements.settingsModal.classList.remove('show');
}

// 保存设置
async function saveSettings() {
  // TODO: 保存设置逻辑
  closeSettings();
}

// 启动应用
init();
