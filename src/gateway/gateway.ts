/**
 * Gateway 主类
 *
 * 整合所有 Gateway 组件，提供统一的接口
 */

import type { AgentSession } from '@mariozechner/pi-coding-agent';
import { EventBus } from './event-bus.js';
import { PermissionChecker } from './permission-checker.js';
import { SessionManager } from './session-manager.js';
import { MessageRouter } from './message-router.js';
import type {
  IGateway,
  Message,
  SessionConfig,
  PermissionRule,
  GatewayEvent,
  EventListener,
  ToolPermission,
} from './types.js';

export class Gateway implements IGateway {
  private eventBus: EventBus;
  private permissionChecker: PermissionChecker;
  private sessionManager: SessionManager;
  private messageRouter: MessageRouter;

  constructor() {
    this.eventBus = new EventBus();
    this.permissionChecker = new PermissionChecker();
    this.sessionManager = new SessionManager();
    this.messageRouter = new MessageRouter(this.eventBus);

    // 添加预设权限规则
    this.permissionChecker.addPresetRules();
  }

  /**
   * 发送消息
   */
  async sendMessage(message: Message): Promise<void> {
    const session = this.sessionManager.get(message.sessionId);
    if (!session) {
      throw new Error(`Session ${message.sessionId} not found`);
    }

    await this.messageRouter.route(message, session);
  }

  /**
   * 创建会话
   */
  async createSession(config: SessionConfig): Promise<AgentSession> {
    const session = await this.sessionManager.create(config);

    // 发布会话创建事件
    this.eventBus.emit({
      type: 'session_created',
      sessionId: config.sessionId,
      data: config,
      timestamp: Date.now(),
    });

    return session;
  }

  /**
   * 获取会话
   */
  getSession(sessionId: string): AgentSession | undefined {
    return this.sessionManager.get(sessionId);
  }

  /**
   * 销毁会话
   */
  async destroySession(sessionId: string): Promise<void> {
    await this.sessionManager.destroy(sessionId);

    // 发布会话销毁事件
    this.eventBus.emit({
      type: 'session_destroyed',
      sessionId,
      data: null,
      timestamp: Date.now(),
    });
  }

  /**
   * 检查权限
   */
  async checkPermission(toolName: string, args: any, rules: PermissionRule[]): Promise<ToolPermission> {
    return this.permissionChecker.check(toolName, args, rules);
  }

  /**
   * 添加权限规则
   */
  addPermissionRule(rule: PermissionRule): void {
    this.permissionChecker.addRule(rule);
  }

  /**
   * 订阅事件
   */
  on(listener: EventListener): void {
    this.eventBus.subscribe(listener);
  }

  /**
   * 取消订阅
   */
  off(listener: EventListener): void {
    this.eventBus.unsubscribe(listener);
  }

  /**
   * 获取所有会话 ID
   */
  getAllSessionIds(): string[] {
    return this.sessionManager.getAllSessionIds();
  }

  /**
   * 获取会话数量
   */
  getSessionCount(): number {
    return this.sessionManager.getSessionCount();
  }

  /**
   * 获取所有权限规则
   */
  getPermissionRules(): PermissionRule[] {
    return this.permissionChecker.getRules();
  }

  /**
   * 广播消息
   */
  async broadcast(message: Omit<Message, 'sessionId'>): Promise<void> {
    await this.messageRouter.broadcast(message);
  }

  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    await this.sessionManager.clear();
    this.eventBus.clear();
    this.permissionChecker.clear();
  }
}

/**
 * 创建 Gateway 实例
 */
export function createGateway(): Gateway {
  return new Gateway();
}
