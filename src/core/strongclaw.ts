/**
 * StrongClaw - Core Philosophy
 *
 * 核心思想：
 * 1. 极简工具（4 个基础工具：read, write, edit, bash）
 * 2. Skills = 知识库，不是工具库
 * 3. 最大化 Prompt Caching
 * 4. 不和模型对赌
 *
 * 设计原则：
 * - 工具是"手段"，能力是"知识"
 * - 4 个工具 + 无限组合 > 50 个固定工具
 * - Skills 是 Markdown 文档，Agent 自己理解和执行
 * - 最小化非模型能力，信任 LLM
 */

import { createAgentSession } from '@mariozechner/pi-coding-agent';
import type { AgentSession } from '@mariozechner/pi-coding-agent';

export interface StrongClawOptions {
  /**
   * 工作目录
   */
  cwd: string;

  /**
   * 使用的模型
   * @default 'claude-sonnet-4'
   */
  model?: string;

  /**
   * Skills 目录路径
   */
  skillsPath?: string;

  /**
   * 是否启用详细日志
   */
  verbose?: boolean;
}

/**
 * StrongClaw Agent Manager
 *
 * 管理 Agent 会话的创建和生命周期
 */
export class StrongClaw {
  private sessions: Map<string, AgentSession> = new Map();

  /**
   * 创建一个新的 Agent 会话
   *
   * @param options - 配置选项
   * @returns Agent 会话实例
   */
  async createSession(options: StrongClawOptions): Promise<AgentSession> {
    const {
      cwd,
      model = 'claude-sonnet-4',
      skillsPath,
      verbose = false,
    } = options;

    if (verbose) {
      console.log('[StrongClaw] 创建新会话...');
      console.log(`  工作目录: ${cwd}`);
      console.log(`  模型: ${model}`);
      console.log(`  Skills 路径: ${skillsPath || '默认'}`);
    }

    // 使用 pi-coding-agent 创建会话
    // 核心理念：只使用 4 个基础工具
    const session = await createAgentSession({
      cwd,
      model,
      // 明确指定只使用 4 个核心工具
      tools: ['read', 'write', 'edit', 'bash'],
      // Skills 路径（如果提供）
      ...(skillsPath && { skillsPath }),
    });

    // 保存会话
    const sessionId = this.generateSessionId();
    this.sessions.set(sessionId, session);

    if (verbose) {
      console.log(`[StrongClaw] 会话创建成功: ${sessionId}`);
    }

    return session;
  }

  /**
   * 获取现有会话
   */
  getSession(sessionId: string): AgentSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * 关闭会话
   */
  async closeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      // TODO: 实现会话清理逻辑
      this.sessions.delete(sessionId);
    }
  }

  /**
   * 生成会话 ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}

/**
 * 创建 StrongClaw 实例
 */
export function createStrongClaw(): StrongClaw {
  return new StrongClaw();
}
