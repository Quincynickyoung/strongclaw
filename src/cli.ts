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
import {
  WELCOME_MESSAGE,
  HELP_MESSAGE,
  INFO_TEMPLATE,
  getRandomTip,
  showExamples,
} from './cli-messages.js';
import { loadConfig, showConfig, updateConfig } from './config-manager.js';
import { recordConversation, showHistory, clearHistory } from './history-manager.js';

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
    // 加载用户配置
    const userConfig = loadConfig();

    // 合并配置
    if (userConfig.defaultProvider && !this.config.provider) {
      this.config.provider = userConfig.defaultProvider;
    }
    if (userConfig.defaultModel && !this.config.model) {
      this.config.model = userConfig.defaultModel;
    }
    if (userConfig.verbose !== undefined && this.config.verbose === false) {
      this.config.verbose = userConfig.verbose;
    }

    console.log(WELCOME_MESSAGE);
    console.log(getRandomTip());
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

      case '/skills':
        this.showSkills();
        break;

      case '/examples':
        this.showExamples();
        break;

      case '/config':
        showConfig();
        break;

      case '/history':
        showHistory();
        break;

      case '/clear-history':
        clearHistory();
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

      // 记录对话历史
      recordConversation(message, response, this.config.workingDirectory);
    } catch (error) {
      console.error('❌ 错误:', error);
      console.log('');
    }
  }

  /**
   * 显示帮助
   */
  private showHelp(): void {
    console.log(HELP_MESSAGE);
  }

  /**
   * 显示会话信息
   */
  private showInfo(): void {
    console.log(INFO_TEMPLATE(this.config));
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

  /**
   * 显示可用 Skills
   */
  private showSkills(): void {
    console.log('');
    console.log('📚 可用的 Skills');
    console.log('');
    console.log('Skills 是知识库，Agent 会自动使用它们来完成任务');
    console.log('');
    console.log('当前可用的 Skills：');
    console.log('  • file-operations.md - 文件操作相关知识');
    console.log('  • git-operations.md  - Git 操作相关知识');
    console.log('');
    console.log('Skills 位置: skills/ 目录');
    console.log('');
  }

  /**
   * 显示使用示例
   */
  private showExamples(): void {
    console.log(showExamples());
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
