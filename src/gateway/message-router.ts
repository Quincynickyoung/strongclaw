/**
 * 消息路由器实现
 *
 * 负责消息的路由和分发
 */

import type { Message, MessageType, IMessageRouter, IEventBus } from './types.js';
import type { AgentSession } from '@mariozechner/pi-coding-agent';

export class MessageRouter implements IMessageRouter {
  private eventBus: IEventBus;

  constructor(eventBus: IEventBus) {
    this.eventBus = eventBus;
  }

  /**
   * 路由消息到指定会话
   */
  async route(message: Message, session: AgentSession): Promise<void> {
    // 发布消息接收事件
    this.eventBus.emit({
      type: 'message_received',
      sessionId: message.sessionId,
      data: message,
      timestamp: Date.now(),
    });

    try {
      // 根据消息类型处理
      switch (message.type) {
        case 'user':
          await this.handleUserMessage(message, session);
          break;
        case 'system':
          await this.handleSystemMessage(message, session);
          break;
        default:
          console.warn(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      // 发布错误事件
      this.eventBus.emit({
        type: 'error',
        sessionId: message.sessionId,
        data: { error, message },
        timestamp: Date.now(),
      });
      throw error;
    }
  }

  /**
   * 处理用户消息
   */
  private async handleUserMessage(message: Message, session: AgentSession): Promise<void> {
    // 发送消息到 Agent
    const response = await session.prompt(message.content);

    // 发布响应事件
    this.eventBus.emit({
      type: 'message_sent',
      sessionId: message.sessionId,
      data: {
        id: this.generateMessageId(),
        type: 'assistant' as MessageType,
        content: response,
        timestamp: Date.now(),
        sessionId: message.sessionId,
      },
      timestamp: Date.now(),
    });
  }

  /**
   * 处理系统消息
   */
  private async handleSystemMessage(message: Message, session: AgentSession): Promise<void> {
    // 系统消息通常用于控制命令
    console.log('System message:', message.content);
  }

  /**
   * 广播消息到所有会话
   */
  async broadcast(message: Omit<Message, 'sessionId'>): Promise<void> {
    this.eventBus.emit({
      type: 'message_broadcast',
      sessionId: 'all',
      data: message,
      timestamp: Date.now(),
    });
  }

  /**
   * 生成消息 ID
   */
  private generateMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
