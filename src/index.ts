/**
 * StrongClaw - 入口文件
 *
 * 启动交互式 CLI
 */

import { startCLI } from './cli.js';
import type { ModelProvider } from './core/model-provider.js';

// 解析命令行参数
const args = process.argv.slice(2);

// 解析参数
let model: string | undefined;
let provider: ModelProvider | undefined;
let verbose = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '--verbose' || arg === '-v') {
    verbose = true;
  } else if (arg === '--model' || arg === '-m') {
    model = args[++i];
  } else if (arg === '--provider' || arg === '-p') {
    provider = args[++i] as ModelProvider;
  } else if (arg === '--help' || arg === '-h') {
    console.log('StrongClaw - AI Agent 平台');
    console.log('');
    console.log('用法：');
    console.log('  npm run dev [选项]');
    console.log('');
    console.log('选项：');
    console.log('  -m, --model <model>        指定模型名称');
    console.log('  -p, --provider <provider>  指定提供商');
    console.log('  -v, --verbose              启用详细日志');
    console.log('  -h, --help                 显示帮助');
    console.log('');
    console.log('示例：');
    console.log('  npm run dev');
    console.log('  npm run dev -- --model gemini-2.0-flash --provider google');
    console.log('  npm run dev -- --model deepseek-chat --provider deepseek');
    console.log('  npm run dev -- --verbose');
    console.log('');
    console.log('支持的提供商：');
    console.log('  anthropic, google, moonshot, deepseek, qwen, openrouter, together');
    console.log('');
    console.log('详细配置请查看: docs/MODELS.md');
    process.exit(0);
  }
}

// 启动 CLI
startCLI({ model, provider, verbose }).catch((error) => {
  console.error('❌ 启动失败:', error);
  process.exit(1);
});
