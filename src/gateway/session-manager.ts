/**
 * 会话管理器实现
 *
 * 负责多会话的生命周期管理
 */

import { createAgentSession } from '@mariozechner/pi-coding-agent';
import type { AgentSession } from '@mariozechner/pi-coding-agent';
import type { SessionConfig, ISessionManager } from './types.js';

export class SessionManager implements ISessionManager {
  private sessions: Map<string, AgentSession> = new Map();
  private sessionConfigs: Map<string, SessionConfig> = new Map();

  /**
   * 创建会话
   */
  async create(config: SessionConfig): Promise<AgentSession> {
    // 检查会话是否已存在
    if (this.sessions.has(config.sessionId)) {
      throw new Error(`Session ${config.sessionId} already exists`);
    }

    // 创建 Agent 会话
    const session = await createAgentSession({
      cwd: config.workingDirectory,
      model: config.model,
      tools: ['read', 'write', 'edit', 'bash'],
      ...(config.skillsPath && { skillsPath: config.skillsPath }),
    });

    // 保存会话
    this.sessions.set(config.sessionId, session);
    this.sessionConfigs.set(config.sessionId, config);

    return session;
  }

  /**
   * 获取会话
   */
  get(sessionId: string): AgentSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * 获取会话配置
   */
  getConfig(sessionId: string): SessionConfig | undefined {
    return this.sessionConfigs.get(sessionId);
  }

  /**
   * 销毁会话
   */
  async destroy(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      // TODO: 实现会话清理逻辑
      this.sessions.delete(sessionId);
      this.sessionConfigs.delete(sessionId);
    }
  }

  /**
   * 获取所有会话 ID
   */
  getAllSessionIds(): string[] {
    return Array.from(this.sessions.keys());
  }

  /**
   * 获取会话数量
   */
  getSessionCount(): number {
    return this.sessions.size;
  }

  /**
   * 检查会话是否存在
   */
  has(sessionId: string): boolean {
    return this.sessions.has(sessionId);
  }

  /**
   * 清空所有会话
   */
  async clear(): void {
    const sessionIds = this.getAllSessionIds();
    for (const sessionId of sessionIds) {
      await this.destroy(sessionId);
    }
  }
}
