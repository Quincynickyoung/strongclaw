/**
 * 历史记录管理器
 *
 * 记录和管理用户的对话历史
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * 对话记录
 */
export interface ConversationEntry {
  timestamp: string;
  user: string;
  assistant: string;
  workingDirectory: string;
}

/**
 * 历史记录目录
 */
const HISTORY_DIR = path.join(os.homedir(), '.strongclaw', 'history');
const HISTORY_FILE = path.join(HISTORY_DIR, 'conversations.jsonl');

/**
 * 确保历史记录目录存在
 */
function ensureHistoryDir(): void {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }
}

/**
 * 记录对话
 */
export function recordConversation(
  user: string,
  assistant: string,
  workingDirectory: string
): void {
  try {
    ensureHistoryDir();

    const entry: ConversationEntry = {
      timestamp: new Date().toISOString(),
      user,
      assistant,
      workingDirectory,
    };

    fs.appendFileSync(HISTORY_FILE, JSON.stringify(entry) + '\n', 'utf-8');
  } catch (error) {
    // 静默失败，不影响主流程
    console.warn('⚠️  记录历史失败');
  }
}

/**
 * 加载历史记录
 */
export function loadHistory(limit: number = 100): ConversationEntry[] {
  try {
    if (!fs.existsSync(HISTORY_FILE)) {
      return [];
    }

    const content = fs.readFileSync(HISTORY_FILE, 'utf-8');
    const lines = content.trim().split('\n');

    // 只返回最近的 N 条记录
    const recentLines = lines.slice(-limit);

    return recentLines
      .map((line) => {
        try {
          return JSON.parse(line) as ConversationEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is ConversationEntry => entry !== null);
  } catch (error) {
    console.warn('⚠️  加载历史失败');
    return [];
  }
}

/**
 * 清空历史记录
 */
export function clearHistory(): void {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      fs.unlinkSync(HISTORY_FILE);
      console.log('✅ 历史记录已清空');
    }
  } catch (error) {
    console.error('❌ 清空历史失败:', error);
  }
}

/**
 * 显示历史记录
 */
export function showHistory(limit: number = 10): void {
  const history = loadHistory(limit);

  console.log('');
  console.log(`📜 最近 ${limit} 条对话记录`);
  console.log('');

  if (history.length === 0) {
    console.log('暂无历史记录');
    console.log('');
    return;
  }

  history.forEach((entry, index) => {
    const date = new Date(entry.timestamp);
    console.log(`[${index + 1}] ${date.toLocaleString()}`);
    console.log(`    目录: ${entry.workingDirectory}`);
    console.log(`    用户: ${entry.user.substring(0, 50)}...`);
    console.log(`    回复: ${entry.assistant.substring(0, 50)}...`);
    console.log('');
  });
}
