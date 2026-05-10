import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		description: { control: 'text' },
		checked: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Wrapper = (props: any) => {
	const [checked, setChecked] = useState(props.checked || false);
	return <Checkbox {...props} checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
	render: () => <Wrapper label='Accept terms' />,
};

export const Checked: Story = {
	render: () => <Wrapper label='Already checked' checked={true} />,
};

export const WithDescription: Story = {
	render: () => <Wrapper label='Send invoice emails' description='Customer will receive an email when invoice is generated' />,
};

export const Unchecked: Story = {
	render: () => <Wrapper label='Enable feature' checked={false} />,
};

export const AllStates: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
			<Wrapper label='Unchecked option' checked={false} />
			<Wrapper label='Checked option' checked={true} />
			<Wrapper label='With description' description='This is a helpful description' checked={false} />
		</div>
	),
};

export const BillingOptions: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
			<Wrapper label='Send payment receipts' checked={true} />
			<Wrapper label='Send invoice reminders' checked={false} />
			<Wrapper label='Enable auto-retry on failed payments' description='Retries up to 3 times over 7 days' checked={true} />
		</div>
	),
};
