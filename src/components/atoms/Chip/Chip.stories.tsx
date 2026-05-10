import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';
import { X, Check, AlertTriangle, Info } from 'lucide-react';

const meta: Meta<typeof Chip> = {
	title: 'Atoms/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['default', 'success', 'warning', 'failed', 'info'] },
		label: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
	args: { label: 'Default', variant: 'default' },
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px' }}>
			<Chip variant='default' label='Default' />
			<Chip variant='success' label='Success' />
			<Chip variant='warning' label='Warning' />
			<Chip variant='failed' label='Failed' />
			<Chip variant='info' label='Info' />
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px' }}>
			<Chip variant='success' label='Paid' icon={<Check size={12} />} />
			<Chip variant='failed' label='Failed' icon={<X size={12} />} />
			<Chip variant='warning' label='Warning' icon={<AlertTriangle size={12} />} />
			<Chip variant='info' label='Info' icon={<Info size={12} />} />
		</div>
	),
};

export const Clickable: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
			<Chip variant='default' label='Click me' onClick={() => alert('Chip clicked!')} />
			<Chip variant='success' label='Active' onClick={() => alert('Active clicked!')} />
		</div>
	),
};

export const Disabled: Story = {
	args: { label: 'Disabled', variant: 'default', disabled: true },
};

export const StatusChips: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px' }}>
			<Chip variant='success' label='Active' />
			<Chip variant='default' label='Archived' />
			<Chip variant='warning' label='Pending' />
			<Chip variant='failed' label='Cancelled' />
			<Chip variant='info' label='Trial' />
		</div>
	),
};

export const WithChildrenAfter: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
			<Chip variant='default' label='React' childrenAfter={<X size={12} />} onClick={() => {}} />
			<Chip variant='info' label='TypeScript' childrenAfter={<X size={12} />} onClick={() => {}} />
		</div>
	),
};
