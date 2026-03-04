/**
 * 配置管理器
 *
 * 负责保存和加载用户配置
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { ModelProvider } from './core/model-provider.js';

/**
 * 用户配置
 */
export interface UserConfig {
  defaultProvider?: ModelProvider;
  defaultModel?: string;
  verbose?: boolean;
  autoCommit?: boolean;
  theme?: 'light' | 'dark';
  language?: 'zh' | 'en';
}

/**
 * 配置文件路径
 */
const CONFIG_DIR = path.join(os.homedir(), '.strongclaw');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

/**
 * 确保配置目录存在
 */
function ensureConfigDir(): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * 加载用户配置
 */
export function loadConfig(): UserConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('⚠️  加载配置失败，使用默认配置');
  }

  return {};
}

/**
 * 保存用户配置
 */
export function saveConfig(config: UserConfig): void {
  try {
    ensureConfigDir();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    console.log('✅ 配置已保存');
  } catch (error) {
    console.error('❌ 保存配置失败:', error);
  }
}

/**
 * 更新用户配置
 */
export function updateConfig(updates: Partial<UserConfig>): void {
  const current = loadConfig();
  const updated = { ...current, ...updates };
  saveConfig(updated);
}

/**
 * 重置配置
 */
export function resetConfig(): void {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
      console.log('✅ 配置已重置');
    }
  } catch (error) {
    console.error('❌ 重置配置失败:', error);
  }
}

/**
 * 显示当前配置
 */
export function showConfig(): void {
  const config = loadConfig();
  console.log('');
  console.log('⚙️  当前配置');
  console.log('');
  console.log(`配置文件: ${CONFIG_FILE}`);
  console.log('');
  console.log('配置内容:');
  console.log(JSON.stringify(config, null, 2));
  console.log('');
}

