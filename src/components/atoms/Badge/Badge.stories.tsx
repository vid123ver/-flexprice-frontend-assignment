import type { Meta, StoryObj } from '@storybook/react';

const variantStyles = {
	active: 'bg-green-100 text-green-700 border-green-200',
	archived: 'bg-gray-100 text-gray-600 border-gray-200',
	paid: 'bg-blue-100 text-blue-700 border-blue-200',
	draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
	void: 'bg-red-100 text-red-600 border-red-200',
	pending: 'bg-orange-100 text-orange-700 border-orange-200',
	cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
};

const Badge = ({ variant = 'active', label }) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			padding: '2px 10px',
			borderRadius: '9999px',
			fontSize: '12px',
			fontWeight: 500,
			border: '1px solid',
		}}>
		{label || variant}
	</span>
);

const meta = {
	title: 'Atoms/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['active', 'archived', 'paid', 'draft', 'void', 'pending', 'cancelled'] },
		label: { control: 'text' },
	},
};

export default meta;

export const Default = { args: { variant: 'active', label: 'Active' } };

export const AllVariants = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px' }}>
			<Badge variant='active' label='Active' />
			<Badge variant='archived' label='Archived' />
			<Badge variant='paid' label='Paid' />
			<Badge variant='draft' label='Draft' />
			<Badge variant='void' label='Void' />
			<Badge variant='pending' label='Pending' />
			<Badge variant='cancelled' label='Cancelled' />
		</div>
	),
};

export const PlanStatus = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
			<Badge variant='active' label='Active Plan' />
			<Badge variant='archived' label='Archived Plan' />
		</div>
	),
};

export const InvoiceStatus = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
			<Badge variant='paid' label='Paid' />
			<Badge variant='draft' label='Draft' />
			<Badge variant='void' label='Void' />
		</div>
	),
};
