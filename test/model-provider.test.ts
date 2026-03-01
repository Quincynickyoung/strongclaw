/**
 * 模型提供商测试
 *
 * 测试多模型支持的各项功能
 */

import {
  detectAvailableProvider,
  getProviderConfig,
  getAvailableProviders,
  isValidModel,
  MODEL_CONFIGS,
  type ModelProvider,
} from '../src/core/model-provider.js';

console.log('🧪 测试模型提供商功能\n');

// 测试 1: 检测可用的提供商
console.log('1️⃣ 测试自动检测可用提供商...');
const detected = detectAvailableProvider();
if (detected) {
  console.log(`✅ 检测到: ${detected.provider} - ${detected.model}`);
} else {
  console.log('❌ 未检测到任何可用的 API Key');
}
console.log('');

// 测试 2: 获取所有可用提供商
console.log('2️⃣ 测试获取所有可用提供商...');
const available = getAvailableProviders();
console.log(`✅ 找到 ${available.length} 个可用提供商:`);
available.forEach((provider) => {
  console.log(`   - ${provider}`);
});
console.log('');

// 测试 3: 测试每个提供商的配置
console.log('3️⃣ 测试提供商配置...');
const providers: ModelProvider[] = [
  'anthropic',
  'google',
  'moonshot',
  'deepseek',
  'qwen',
  'openrouter',
  'together',
];

providers.forEach((provider) => {
  const config = getProviderConfig(provider);
  if (config) {
    console.log(`✅ ${provider}: ${config.model}`);
  } else {
    console.log(`⚠️  ${provider}: API Key 未设置`);
  }
});
console.log('');

// 测试 4: 验证模型名称
console.log('4️⃣ 测试模型名称验证...');
const testCases = [
  { provider: 'google' as ModelProvider, model: 'gemini-2.0-flash', expected: true },
  { provider: 'google' as ModelProvider, model: 'invalid-model', expected: false },
  { provider: 'deepseek' as ModelProvider, model: 'deepseek-chat', expected: true },
  { provider: 'deepseek' as ModelProvider, model: 'gpt-4', expected: false },
];

testCases.forEach(({ provider, model, expected }) => {
  const result = isValidModel(provider, model);
  const status = result === expected ? '✅' : '❌';
  console.log(`${status} ${provider}/${model}: ${result} (期望: ${expected})`);
});
console.log('');

// 测试 5: 检查配置完整性
console.log('5️⃣ 测试配置完整性...');
let configValid = true;
Object.entries(MODEL_CONFIGS).forEach(([provider, config]) => {
  if (!config.envKey) {
    console.log(`❌ ${provider}: 缺少 envKey`);
    configValid = false;
  }
  if (!config.defaultModel) {
    console.log(`❌ ${provider}: 缺少 defaultModel`);
    configValid = false;
  }
  if (!config.models || config.models.length === 0) {
    console.log(`❌ ${provider}: 缺少 models 列表`);
    configValid = false;
  }
});
if (configValid) {
  console.log('✅ 所有配置完整');
}
console.log('');

// 测试总结
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('📊 测试总结:');
console.log(`   可用提供商: ${available.length}/7`);
console.log(`   配置完整性: ${configValid ? '✅ 通过' : '❌ 失败'}`);
console.log('');

if (available.length === 0) {
  console.log('💡 提示: 请设置至少一个 API Key 来测试完整功能');
  console.log('');
  console.log('示例:');
  console.log('  export GOOGLE_API_KEY=your-key');
  console.log('  export DEEPSEEK_API_KEY=your-key');
  console.log('');
}

console.log('✨ 测试完成！');
