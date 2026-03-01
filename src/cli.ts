/**
 * StrongClaw CLI - 交互式命令行界面
 *
 * 提供完整的对话功能，验证核心理念
 */

import * as readline from 'readline';
import { createStrongClaw } from './core/strongclaw.js';
import type { AgentSession } from '@mariozechner/pi-coding-agent';
import {
  detectAvailableProvider,
  getProviderConfig,
  printAvailableProviders,
  type ModelProvider,
} from './core/model-provider.js';

/**
 * CLI 配置
 */
interface CLIConfig {
  workingDirectory: string;
  model?: string;
  provider?: ModelProvider;
  verbose: boolean;
}

/**
 * StrongClaw CLI
 */
export class StrongClawCLI {
  private session: AgentSession | null = null;
  private rl: readline.Interface;
  private config: CLIConfig;

  constructor(config: CLIConfig) {
    this.config = config;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '🦅 > ',
    });
  }

  /**
   * 启动 CLI
   */
  async start(): Promise<void> {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║              🦅 StrongClaw - AI Agent 平台                ║');
    console.log('║                                                            ║');
    console.log('║  核心理念：极简工具 + 知识驱动 + 信任模型 = 无限可能      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📋 核心思想：');
    console.log('  • 4 个基础工具：read, write, edit, bash');
    console.log('  • Skills = 知识库，不是工具库');
    console.log('  • 最大化 Prompt Caching');
    console.log('  • 不和模型对赌');
    console.log('');
    console.log('💡 命令：');
    console.log('  /help      - 显示帮助');
    console.log('  /info      - 显示会话信息');
    console.log('  /models    - 显示可用模型');
    console.log('  /clear     - 清屏');
    console.log('  /exit      - 退出');
    console.log('');

    // 初始化会话
    await this.initSession();

    // 开始交互循环
    this.startInteraction();
  }

  /**
   * 初始化 Agent 会话
   */
  private async initSession(): Promise<void> {
    // 检测或使用指定的模型
    let modelConfig;

    if (this.config.provider && this.config.model) {
      // 使用指定的提供商和模型
      modelConfig = getProviderConfig(this.config.provider, this.config.model);
      if (!modelConfig) {
        console.error(
          `❌ 未找到 ${this.config.provider} 的 API Key，请设置环境变量`
        );
        printAvailableProviders();
        process.exit(1);
      }
    } else {
      // 自动检测可用的提供商
      modelConfig = detectAvailableProvider();
      if (!modelConfig) {
        console.error('❌ 未检测到任何可用的 API Key');
        console.log('');
        printAvailableProviders();
        process.exit(1);
      }
    }

    console.log('⏳ 正在初始化 Agent 会话...');
    console.log(`   工作目录: ${this.config.workingDirectory}`);
    console.log(`   提供商: ${modelConfig.provider}`);
    console.log(`   模型: ${modelConfig.model}`);
    console.log('');

    try {
      const strongclaw = createStrongClaw();
      this.session = await strongclaw.createSession({
        cwd: this.config.workingDirectory,
        model: modelConfig.model,
        verbose: this.config.verbose,
      });

      console.log('✅ 会话初始化成功！');
      console.log('');
      console.log('现在你可以开始对话了。试试：');
      console.log('  • "列出当前目录的文件"');
      console.log('  • "帮我分析一下 package.json"');
      console.log('  • "创建一个 hello.txt 文件"');
      console.log('');
    } catch (error) {
      console.error('❌ 会话初始化失败:', error);
      process.exit(1);
    }
  }

  /**
   * 开始交互循环
   */
  private startInteraction(): void {
    this.rl.prompt();

    this.rl.on('line', async (input: string) => {
      const trimmed = input.trim();

      // 空输入
      if (!trimmed) {
        this.rl.prompt();
        return;
      }

      // 处理命令
      if (trimmed.startsWith('/')) {
        await this.handleCommand(trimmed);
        this.rl.prompt();
        return;
      }

      // 处理用户消息
      await this.handleMessage(trimmed);
      this.rl.prompt();
    });

    this.rl.on('close', () => {
      console.log('');
      console.log('👋 再见！');
      process.exit(0);
    });
  }

  /**
   * 处理命令
   */
  private async handleCommand(command: string): Promise<void> {
    const cmd = command.toLowerCase();

    switch (cmd) {
      case '/help':
        this.showHelp();
        break;

      case '/info':
        this.showInfo();
        break;

      case '/models':
        this.showModels();
        break;

      case '/clear':
        console.clear();
        break;

      case '/exit':
        this.rl.close();
        break;

      default:
        console.log(`❌ 未知命令: ${command}`);
        console.log('   输入 /help 查看可用命令');
    }
  }

  /**
   * 处理用户消息
   */
  private async handleMessage(message: string): Promise<void> {
    if (!this.session) {
      console.error('❌ 会话未初始化');
      return;
    }

    console.log('');
    console.log('🤔 思考中...');
    console.log('');

    try {
      // 调用 Agent
      const response = await this.session.prompt(message);

      console.log('🦅 StrongClaw:');
      console.log('');
      console.log(response);
      console.log('');
    } catch (error) {
      console.error('❌ 错误:', error);
      console.log('');
    }
  }

  /**
   * 显示帮助
   */
  private showHelp(): void {
    console.log('');
    console.log('📖 StrongClaw CLI 帮助');
    console.log('');
    console.log('命令：');
    console.log('  /help    - 显示此帮助信息');
    console.log('  /info    - 显示会话信息');
    console.log('  /clear   - 清屏');
    console.log('  /exit    - 退出程序');
    console.log('');
    console.log('使用方式：');
    console.log('  直接输入你的问题或指令，Agent 会自动执行');
    console.log('');
    console.log('示例：');
    console.log('  • 列出当前目录的文件');
    console.log('  • 帮我分析一下 package.json');
    console.log('  • 创建一个 hello.txt 文件，内容是 "Hello, StrongClaw!"');
    console.log('  • 查找所有 .ts 文件');
    console.log('');
    console.log('核心理念：');
    console.log('  StrongClaw 只有 4 个基础工具（read, write, edit, bash）');
    console.log('  但通过无限组合，可以完成任何任务');
    console.log('');
  }

  /**
   * 显示会话信息
   */
  private showInfo(): void {
    console.log('');
    console.log('ℹ️  会话信息');
    console.log('');
    console.log(`工作目录: ${this.config.workingDirectory}`);
    console.log(`模型: ${this.config.model || '自动检测'}`);
    console.log(`提供商: ${this.config.provider || '自动检测'}`);
    console.log(`详细日志: ${this.config.verbose ? '开启' : '关闭'}`);
    console.log('');
    console.log('核心工具：');
    console.log('  • read   - 读取文件');
    console.log('  • write  - 写入文件');
    console.log('  • edit   - 编辑文件');
    console.log('  • bash   - 执行命令');
    console.log('');
  }

  /**
   * 显示可用模型
   */
  private showModels(): void {
    console.log('');
    console.log('📦 可用的模型提供商');
    console.log('');
    printAvailableProviders();
  }
}

/**
 * 启动 CLI
 */
export async function startCLI(config?: Partial<CLIConfig>): Promise<void> {
  const defaultConfig: CLIConfig = {
    workingDirectory: process.cwd(),
    verbose: false,
  };

  const finalConfig = { ...defaultConfig, ...config };
  const cli = new StrongClawCLI(finalConfig);
  await cli.start();
}
