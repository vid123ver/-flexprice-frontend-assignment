import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'number', description: 'Size in pixels' },
		className: { control: 'text', description: 'Additional CSS classes' },
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	args: { size: 24 },
};

export const Small: Story = {
	args: { size: 16 },
};

export const Medium: Story = {
	args: { size: 32 },
};

export const Large: Story = {
	args: { size: 48 },
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '16px' }}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
				<Spinner size={16} />
				<span style={{ fontSize: '12px', color: '#6b7280' }}>Small 16px</span>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
				<Spinner size={24} />
				<span style={{ fontSize: '12px', color: '#6b7280' }}>Default 24px</span>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
				<Spinner size={32} />
				<span style={{ fontSize: '12px', color: '#6b7280' }}>Medium 32px</span>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
				<Spinner size={48} />
				<span style={{ fontSize: '12px', color: '#6b7280' }}>Large 48px</span>
			</div>
		</div>
	),
};

export const WithCustomColor: Story = {
	args: { size: 32, className: 'text-blue-500' },
};

export const LoadingPage: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px' }}>
			<Spinner size={40} />
			<span style={{ fontSize: '14px', color: '#6b7280' }}>Loading your data...</span>
		</div>
	),
};
