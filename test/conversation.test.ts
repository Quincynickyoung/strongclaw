/**
 * StrongClaw - 完整功能测试
 *
 * 测试 CLI 的完整对话功能
 */

import { createStrongClaw } from '../src/core/strongclaw.js';

async function testFullConversation() {
  console.log('🧪 StrongClaw 完整功能测试\n');

  try {
    // 创建实例
    console.log('1️⃣ 创建 StrongClaw 实例...');
    const strongclaw = createStrongClaw();
    console.log('✅ 通过\n');

    // 创建会话
    console.log('2️⃣ 创建 Agent 会话...');
    const session = await strongclaw.createSession({
      cwd: process.cwd(),
      model: 'claude-sonnet-4',
      verbose: false,
    });
    console.log('✅ 通过\n');

    // 测试对话功能
    console.log('3️⃣ 测试对话功能...');
    console.log('   发送消息: "列出当前目录的文件"\n');

    const response = await session.prompt('列出当前目录的文件');

    console.log('   收到响应:');
    console.log('   ---');
    console.log(response);
    console.log('   ---\n');
    console.log('✅ 通过\n');

    console.log('🎉 所有测试通过！\n');
    console.log('StrongClaw CLI 已就绪，可以开始使用：');
    console.log('  npm run dev\n');

  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.log('\n💡 提示：');
    console.log('  请确保已设置 ANTHROPIC_API_KEY 环境变量');
    console.log('  export ANTHROPIC_API_KEY=your-api-key\n');
    process.exit(1);
  }
}

testFullConversation();
