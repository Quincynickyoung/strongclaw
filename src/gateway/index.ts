/**
 * Gateway 层导出
 *
 * 统一导出所有 Gateway 相关的类型和实现
 */

// 主类
export { Gateway, createGateway } from './gateway.js';

// 组件
export { EventBus } from './event-bus.js';
export { PermissionChecker } from './permission-checker.js';
export { SessionManager } from './session-manager.js';
export { MessageRouter } from './message-router.js';

// 类型
export type {
  IGateway,
  IEventBus,
  IPermissionChecker,
  ISessionManager,
  IMessageRouter,
  Message,
  MessageType,
  SessionConfig,
  PermissionRule,
  ToolPermission,
  GatewayEvent,
  EventListener,
} from './types.js';
