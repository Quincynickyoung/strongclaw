/**
 * 多模型提供商支持
 *
 * 支持的提供商：
 * - Anthropic Claude
 * - Google Gemini
 * - Moonshot Kimi
 * - DeepSeek
 * - Alibaba Qwen
 * - OpenRouter（聚合）
 * - Together AI
 */

export type ModelProvider =
  | 'anthropic'
  | 'google'
  | 'moonshot'
  | 'deepseek'
  | 'qwen'
  | 'openrouter'
  | 'together';

export interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey?: string;
  baseURL?: string;
}

/**
 * 模型配置映射
 */
export const MODEL_CONFIGS: Record<
  ModelProvider,
  {
    envKey: string;
    defaultModel: string;
    baseURL?: string;
    models: string[];
  }
> = {
  anthropic: {
    envKey: 'ANTHROPIC_API_KEY',
    defaultModel: 'claude-sonnet-4',
    models: ['claude-sonnet-4', 'claude-opus-4', 'claude-haiku-4'],
  },
  google: {
    envKey: 'GOOGLE_API_KEY',
    defaultModel: 'gemini-2.0-flash',
    models: ['gemini-2.0-flash', 'gemini-pro', 'gemini-ultra'],
  },
  moonshot: {
    envKey: 'MOONSHOT_API_KEY',
    defaultModel: 'moonshot-v1-32k',
    baseURL: 'https://api.moonshot.cn/v1',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
  },
  deepseek: {
    envKey: 'DEEPSEEK_API_KEY',
    defaultModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-coder'],
  },
  qwen: {
    envKey: 'QWEN_API_KEY',
    defaultModel: 'qwen-plus',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
  },
  openrouter: {
    envKey: 'OPENROUTER_API_KEY',
    defaultModel: 'google/gemini-2.0-flash',
    baseURL: 'https://openrouter.ai/api/v1',
    models: [
      'anthropic/claude-sonnet-4',
      'google/gemini-2.0-flash',
      'meta-llama/llama-3.1-70b',
      'mistralai/mistral-large',
    ],
  },
  together: {
    envKey: 'TOGETHER_API_KEY',
    defaultModel: 'meta-llama/Llama-3-70b-chat-hf',
    baseURL: 'https://api.together.xyz/v1',
    models: [
      'meta-llama/Llama-3-70b-chat-hf',
      'mistralai/Mixtral-8x7B-Instruct-v0.1',
      'Qwen/Qwen2-72B-Instruct',
    ],
  },
};

/**
 * 自动检测可用的模型提供商
 */
export function detectAvailableProvider(): ModelConfig | null {
  // 按优先级检测
  const priorities: ModelProvider[] = [
    'google', // Gemini 免费额度大
    'deepseek', // 国内速度快
    'qwen', // 国内速度快
    'moonshot', // 国内速度快
    'anthropic', // 性能强
    'openrouter', // 聚合服务
    'together', // 开源模型
  ];

  for (const provider of priorities) {
    const config = MODEL_CONFIGS[provider];
    const apiKey = process.env[config.envKey];

    if (apiKey) {
      return {
        provider,
        model: config.defaultModel,
        apiKey,
        baseURL: config.baseURL,
      };
    }
  }

  return null;
}

/**
 * 获取指定提供商的配置
 */
export function getProviderConfig(
  provider: ModelProvider,
  model?: string
): ModelConfig | null {
  const config = MODEL_CONFIGS[provider];
  const apiKey = process.env[config.envKey];

  if (!apiKey) {
    return null;
  }

  return {
    provider,
    model: model || config.defaultModel,
    apiKey,
    baseURL: config.baseURL,
  };
}

/**
 * 验证模型名称是否有效
 */
export function isValidModel(provider: ModelProvider, model: string): boolean {
  const config = MODEL_CONFIGS[provider];
  return config.models.includes(model);
}

/**
 * 获取所有可用的提供商
 */
export function getAvailableProviders(): ModelProvider[] {
  return Object.keys(MODEL_CONFIGS).filter((provider) => {
    const config = MODEL_CONFIGS[provider as ModelProvider];
    return !!process.env[config.envKey];
  }) as ModelProvider[];
}

/**
 * 打印可用的提供商信息
 */
export function printAvailableProviders(): void {
  const available = getAvailableProviders();

  if (available.length === 0) {
    console.log('❌ 未检测到任何可用的 API Key');
    console.log('\n请设置以下环境变量之一：');
    Object.entries(MODEL_CONFIGS).forEach(([provider, config]) => {
      console.log(`  - ${config.envKey} (${provider})`);
    });
    console.log('\n详细配置请查看: docs/MODELS.md');
    return;
  }

  console.log('✅ 可用的模型提供商：\n');
  available.forEach((provider) => {
    const config = MODEL_CONFIGS[provider];
    console.log(`  📦 ${provider}`);
    console.log(`     默认模型: ${config.defaultModel}`);
    console.log(`     可用模型: ${config.models.join(', ')}`);
    console.log();
  });
}
