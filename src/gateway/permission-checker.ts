/**
 * 权限检查器实现
 *
 * 负责工具执行的权限控制
 */

import type { PermissionRule, ToolPermission, IPermissionChecker } from './types.js';

export class PermissionChecker implements IPermissionChecker {
  private rules: Map<string, PermissionRule> = new Map();

  /**
   * 检查权限
   */
  async check(toolName: string, args: any, rules: PermissionRule[]): Promise<ToolPermission> {
    // 首先检查传入的规则
    for (const rule of rules) {
      if (this.matchRule(rule, toolName, args)) {
        return rule.permission;
      }
    }

    // 然后检查全局规则
    const globalRule = this.rules.get(toolName);
    if (globalRule && this.matchRule(globalRule, toolName, args)) {
      return globalRule.permission;
    }

    // 默认：需要询问
    return 'ask';
  }

  /**
   * 匹配规则
   */
  private matchRule(rule: PermissionRule, toolName: string, args: any): boolean {
    // 工具名称匹配
    if (rule.toolName !== toolName && rule.toolName !== '*') {
      return false;
    }

    // 如果有条件，检查条件
    if (rule.condition) {
      return rule.condition(args);
    }

    return true;
  }

  /**
   * 添加规则
   */
  addRule(rule: PermissionRule): void {
    this.rules.set(rule.toolName, rule);
  }

  /**
   * 移除规则
   */
  removeRule(toolName: string): void {
    this.rules.delete(toolName);
  }

  /**
   * 获取所有规则
   */
  getRules(): PermissionRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * 清空所有规则
   */
  clear(): void {
    this.rules.clear();
  }

  /**
   * 添加预设规则
   */
  addPresetRules(): void {
    // 只读操作：自动允许
    this.addRule({
      toolName: 'read',
      permission: 'allow',
    });

    // Bash 命令：需要询问（除非是安全命令）
    this.addRule({
      toolName: 'bash',
      permission: 'ask',
      condition: (args) => {
        const command = args.command || '';
        // 安全的只读命令
        const safeCommands = ['ls', 'pwd', 'cat', 'head', 'tail', 'grep', 'find', 'which'];
        const firstWord = command.trim().split(/\s+/)[0];
        return !safeCommands.includes(firstWord);
      },
    });

    // Write 和 Edit：需要询问
    this.addRule({
      toolName: 'write',
      permission: 'ask',
    });

    this.addRule({
      toolName: 'edit',
      permission: 'ask',
    });
  }
}
