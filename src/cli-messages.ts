/**
 * CLI 帮助和欢迎信息
 */

export const WELCOME_MESSAGE = `
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              🦅 StrongClaw - AI Agent 平台                ║
║                                                            ║
║  核心理念：极简工具 + 知识驱动 + 信任模型 = 无限可能      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

📋 核心思想：
  • 4 个基础工具：read, write, edit, bash
  • Skills = 知识库，不是工具库
  • 最大化 Prompt Caching
  • 不和模型对赌

💡 命令：
  /help      - 显示帮助
  /info      - 显示会话信息
  /models    - 显示可用模型
  /skills    - 显示可用 Skills
  /examples  - 显示使用示例
  /config    - 显示配置
  /history   - 显示历史
  /clear     - 清屏
  /exit      - 退出
`;

export const HELP_MESSAGE = `
📖 StrongClaw CLI 帮助

命令：
  /help           - 显示此帮助信息
  /info           - 显示会话信息
  /models         - 显示可用模型
  /skills         - 显示可用 Skills
  /examples       - 显示使用示例
  /config         - 显示当前配置
  /history        - 显示对话历史
  /clear-history  - 清空对话历史
  /clear          - 清屏
  /exit           - 退出程序

使用方式：
  直接输入你的问题或指令，Agent 会自动执行

示例：
  • 列出当前目录的文件
  • 帮我分析一下 package.json
  • 创建一个 hello.txt 文件，内容是 "Hello, StrongClaw!"
  • 查找所有 .ts 文件
  • 使用 git 创建一个新分支

核心理念：
  StrongClaw 只有 4 个基础工具（read, write, edit, bash）
  但通过无限组合，可以完成任何任务

Skills 系统：
  输入 /skills 查看可用的 Skills
  Skills 是知识库，Agent 会自动使用它们来完成任务

配置管理：
  配置文件位于 ~/.strongclaw/config.json
  可以设置默认模型、提供商等

更多信息：
  • 文档：docs/USAGE.md
  • 核心思想：docs/PHILOSOPHY.md
  • 模型配置：docs/MODELS.md
  • GitHub：https://github.com/Quincynickyoung/strongclaw
`;

export const INFO_TEMPLATE = (config: {
  workingDirectory: string;
  model?: string;
  provider?: string;
  verbose: boolean;
}) => `
ℹ️  会话信息

工作目录: ${config.workingDirectory}
模型: ${config.model || '自动检测'}
提供商: ${config.provider || '自动检测'}
详细日志: ${config.verbose ? '开启' : '关闭'}

核心工具：
  • read   - 读取文件
  • write  - 写入文件
  • edit   - 编辑文件
  • bash   - 执行命令

版本信息：
  • StrongClaw: 0.2.0
  • Node.js: ${process.version}
  • Platform: ${process.platform}
`;

export const STARTUP_TIPS = [
  '💡 提示：输入 /help 查看所有可用命令',
  '💡 提示：输入 /models 查看可用的模型',
  '💡 提示：输入 /skills 查看可用的 Skills',
  '💡 提示：StrongClaw 支持 7 个主流 LLM 提供商',
  '💡 提示：使用 Ctrl+C 或 /exit 退出程序',
];

export function getRandomTip(): string {
  return STARTUP_TIPS[Math.floor(Math.random() * STARTUP_TIPS.length)];
}

export const EXAMPLES = [
  {
    category: '文件操作',
    examples: [
      '列出当前目录的文件',
      '创建一个 README.md 文件',
      '查找所有 .ts 文件',
      '批量重命名文件',
    ],
  },
  {
    category: 'Git 操作',
    examples: [
      '查看 git 状态',
      '创建一个新分支',
      '提交当前改动',
      '查看最近的提交历史',
    ],
  },
  {
    category: '代码分析',
    examples: [
      '分析 package.json',
      '统计代码行数',
      '查找 TODO 注释',
      '检查代码风格',
    ],
  },
  {
    category: '项目管理',
    examples: [
      '安装依赖',
      '运行测试',
      '构建项目',
      '清理临时文件',
    ],
  },
];

export function showExamples(): string {
  let output = '\n📚 使用示例\n\n';

  EXAMPLES.forEach(({ category, examples }) => {
    output += `${category}：\n`;
    examples.forEach((example) => {
      output += `  • ${example}\n`;
    });
    output += '\n';
  });

  return output;
}
