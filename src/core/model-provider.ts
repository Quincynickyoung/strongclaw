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
    defaultModel: 'claude-sonnet-4.6',
    models: ['claude-opus-4.6', 'claude-sonnet-4.6', 'claude-haiku-4.5'],
  },
  google: {
    envKey: 'GOOGLE_API_KEY',
    defaultModel: 'gemini-3-flash-preview',
    models: [
      'gemini-3.1-pro-preview',
      'gemini-3-flash-preview',
      'gemini-3.1-flash-lite-preview',
      'gemini-2.5-flash-preview',
      'gemini-2.5-pro-preview',
    ],
  },
  moonshot: {
    envKey: 'MOONSHOT_API_KEY',
    defaultModel: 'kimi-k2.5',
    baseURL: 'https://api.moonshot.cn/v1',
    models: ['kimi-k2.5', 'kimi-k2-thinking', 'moonshot-v1-128k'],
  },
  deepseek: {
    envKey: 'DEEPSEEK_API_KEY',
    defaultModel: 'deepseek-r1',
    baseURL: 'https://api.deepseek.com/v1',
    models: ['deepseek-r1', 'deepseek-v3.2-exp', 'deepseek-chat', 'deepseek-coder'],
  },
  qwen: {
    envKey: 'QWEN_API_KEY',
    defaultModel: 'qwen3.5-max',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen3.5-max', 'qwen3.5-plus', 'qwen3.5-turbo', 'qwen-turbo', 'qwen-plus', 'qwen-max'],
  },
  openrouter: {
    envKey: 'OPENROUTER_API_KEY',
    defaultModel: 'google/gemini-3-flash-preview',
    baseURL: 'https://openrouter.ai/api/v1',
    models: [
      'anthropic/claude-opus-4.6',
      'anthropic/claude-sonnet-4.6',
      'google/gemini-3.1-pro-preview',
      'google/gemini-3-flash-preview',
      'deepseek/deepseek-r1',
      'meta-llama/llama-3.1-70b',
    ],
  },
  together: {
    envKey: 'TOGETHER_API_KEY',
    defaultModel: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    baseURL: 'https://api.together.xyz/v1',
    models: [
      'meta-llama/Llama-3.3-70B-Instruct-Turbo',
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

/**
 * 获取提供商的友好名称
 */
export function getProviderDisplayName(provider: ModelProvider): string {
  const names: Record<ModelProvider, string> = {
    anthropic: 'Anthropic Claude',
    google: 'Google Gemini',
    moonshot: 'Moonshot Kimi',
    deepseek: 'DeepSeek',
    qwen: 'Alibaba Qwen',
    openrouter: 'OpenRouter',
    together: 'Together AI',
  };
  return names[provider];
}

/**
 * 验证 API Key 格式（基础检查）
 */
export function validateApiKey(provider: ModelProvider, apiKey: string): boolean {
  if (!apiKey || apiKey.trim().length === 0) {
    return false;
  }

  // 基础长度检查
  if (apiKey.length < 10) {
    return false;
  }

  // 提供商特定的格式检查
  switch (provider) {
    case 'anthropic':
      return apiKey.startsWith('sk-ant-');
    case 'google':
      return apiKey.length > 20; // Google API keys are typically longer
    case 'openrouter':
      return apiKey.startsWith('sk-or-');
    default:
      return true; // 其他提供商暂不做特殊检查
  }
}

/**
 * 获取模型的推荐使用场景
 */
export function getModelRecommendation(provider: ModelProvider): string {
  const recommendations: Record<ModelProvider, string> = {
    google: '免费额度大，适合新手和日常使用',
    deepseek: '国内速度快，价格低，适合高频使用',
    qwen: '中文理解好，适合中文任务',
    moonshot: '长上下文支持，适合处理大文件',
    anthropic: '性能强，理解力好，适合复杂任务',
    openrouter: '一个 Key 访问所有模型，适合需要多模型的场景',
    together: '开源模型，适合实验和研究',
  };
  return recommendations[provider];
}

