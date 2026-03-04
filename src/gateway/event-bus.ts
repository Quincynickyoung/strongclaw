/**
 * 事件总线实现
 *
 * 提供统一的事件发布/订阅机制
 */

import type { GatewayEvent, EventListener, IEventBus } from './types.js';

export class EventBus implements IEventBus {
  private listeners: Set<EventListener> = new Set();

  /**
   * 发布事件
   */
  emit(event: GatewayEvent): void {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error('Event listener error:', error);
      }
    });
  }

  /**
   * 订阅事件
   */
  subscribe(listener: EventListener): void {
    this.listeners.add(listener);
  }

  /**
   * 取消订阅
   */
  unsubscribe(listener: EventListener): void {
    this.listeners.delete(listener);
  }

  /**
   * 获取监听器数量
   */
  getListenerCount(): number {
    return this.listeners.size;
  }

  /**
   * 清空所有监听器
   */
  clear(): void {
    this.listeners.clear();
  }
}
