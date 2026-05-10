import type { Meta, StoryObj } from '@storybook/react';
import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
	title: 'Atoms/CodeBlock',
	component: CodeBlock,
	tags: ['autodocs'],
	argTypes: {
		language: { control: 'select', options: ['javascript', 'typescript', 'bash', 'json'] },
		code: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const jsCode = "const greeting = (name) => {\n  return `Hello, ${name}!`;\n};\nconsole.log(greeting('FlexPrice'));";
const bashCode = 'npm install @flexprice/sdk\n\n# Initialize\nflexprice init --api-key YOUR_API_KEY';
const jsonCode = '{\n  "plan": {\n    "id": "plan_123",\n    "name": "Pro Plan",\n    "price": 49.99\n  }\n}';

export const Default: Story = {
	args: { code: jsCode, language: 'javascript' },
};

export const BashCommands: Story = {
	args: { code: bashCode, language: 'bash' },
};

export const JsonConfig: Story = {
	args: { code: jsonCode, language: 'json' },
};

export const AllLanguages: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
			<div>
				<p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>JavaScript</p>
				<CodeBlock code={jsCode} language='javascript' />
			</div>
			<div>
				<p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Bash</p>
				<CodeBlock code={bashCode} language='bash' />
			</div>
			<div>
				<p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>JSON</p>
				<CodeBlock code={jsonCode} language='json' />
			</div>
		</div>
	),
};
