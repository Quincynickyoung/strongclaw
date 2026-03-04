/**
 * Gateway 层 - 核心接口定义
 *
 * Gateway 是 StrongClaw 的消息路由和权限控制层
 * 负责：
 * 1. 消息路由 - 统一的消息入口和分发
 * 2. 权限控制 - 工具执行的权限管理
 * 3. 会话管理 - 多会话的生命周期管理
 * 4. 事件总线 - 统一的事件分发机制
 */

import type { AgentSession } from '@mariozechner/pi-coding-agent';

/**
 * 消息类型
 */
export type MessageType = 'user' | 'assistant' | 'system' | 'tool_call' | 'tool_result';

/**
 * 消息接口
 */
export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  sessionId: string;
  metadata?: Record<string, any>;
}

/**
 * 工具调用权限
 */
export type ToolPermission = 'allow' | 'deny' | 'ask';

/**
 * 权限规则
 */
export interface PermissionRule {
  toolName: string;
  permission: ToolPermission;
  condition?: (args: any) => boolean;
}

/**
 * 会话配置
 */
export interface SessionConfig {
  sessionId: string;
  cwd: string;
  model?: string;
  provider?: string;
  permissions?: PermissionRule[];
  metadata?: Record<string, any>;
}

/**
 * Gateway 事件
 */
export type GatewayEvent =
  | { type: 'session_created'; sessionId: string }
  | { type: 'session_destroyed'; sessionId: string }
  | { type: 'message_received'; message: Message }
  | { type: 'message_sent'; message: Message }
  | { type: 'tool_call_requested'; toolName: string; args: any; sessionId: string }
  | { type: 'tool_call_approved'; toolName: string; sessionId: string }
  | { type: 'tool_call_denied'; toolName: string; sessionId: string }
  | { type: 'error'; error: Error; sessionId?: string };

/**
 * 事件监听器
 */
export type EventListener = (event: GatewayEvent) => void | Promise<void>;

/**
 * Gateway 接口
 */
export interface IGateway {
  /**
   * 创建会话
   */
  createSession(config: SessionConfig): Promise<string>;

  /**
   * 销毁会话
   */
  destroySession(sessionId: string): Promise<void>;

  /**
   * 获取会话
   */
  getSession(sessionId: string): AgentSession | undefined;

  /**
   * 发送消息
   */
  sendMessage(sessionId: string, content: string): Promise<Message>;

  /**
   * 检查工具权限
   */
  checkPermission(sessionId: string, toolName: string, args: any): Promise<ToolPermission>;

  /**
   * 设置权限规则
   */
  setPermissionRule(sessionId: string, rule: PermissionRule): void;

  /**
   * 监听事件
   */
  on(listener: EventListener): void;

  /**
   * 移除监听器
   */
  off(listener: EventListener): void;
}

/**
 * 权限检查器接口
 */
export interface IPermissionChecker {
  /**
   * 检查权限
   */
  check(toolName: string, args: any, rules: PermissionRule[]): Promise<ToolPermission>;

  /**
   * 添加规则
   */
  addRule(rule: PermissionRule): void;

  /**
   * 移除规则
   */
  removeRule(toolName: string): void;

  /**
   * 获取所有规则
   */
  getRules(): PermissionRule[];
}

/**
 * 会话管理器接口
 */
export interface ISessionManager {
  /**
   * 创建会话
   */
  create(config: SessionConfig): Promise<AgentSession>;

  /**
   * 获取会话
   */
  get(sessionId: string): AgentSession | undefined;

  /**
   * 销毁会话
   */
  destroy(sessionId: string): Promise<void>;

  /**
   * 获取所有会话 ID
   */
  getAllSessionIds(): string[];

  /**
   * 获取会话数量
   */
  getSessionCount(): number;
}

/**
 * 事件总线接口
 */
export interface IEventBus {
  /**
   * 发布事件
   */
  emit(event: GatewayEvent): void;

  /**
   * 订阅事件
   */
  subscribe(listener: EventListener): void;

  /**
   * 取消订阅
   */
  unsubscribe(listener: EventListener): void;

  /**
   * 获取监听器数量
   */
  getListenerCount(): number;
}
