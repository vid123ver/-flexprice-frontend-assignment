import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
	title: 'Atoms/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		title: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

const Wrapper = (props: any) => {
	const [dates, setDates] = useState<{ startDate?: Date; endDate?: Date }>({});
	return (
		<div style={{ padding: '32px' }}>
			<DateRangePicker {...props} startDate={dates.startDate} endDate={dates.endDate} onChange={setDates} />
		</div>
	);
};

export const Default: Story = {
	render: () => <Wrapper placeholder='Select Range' />,
};

export const WithTitle: Story = {
	render: () => <Wrapper title='Billing Period' placeholder='Select date range' />,
};

export const Disabled: Story = {
	render: () => <Wrapper disabled={true} placeholder='Select Range' />,
};

export const PreSelected: Story = {
	render: () => {
		const start = new Date();
		start.setDate(1);
		const end = new Date();
		return (
			<div style={{ padding: '32px' }}>
				<DateRangePicker startDate={start} endDate={end} onChange={() => {}} title='Current Month' />
			</div>
		);
	},
};

export const AnalyticsFilter: Story = {
	render: () => (
		<div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<p style={{ fontSize: '14px', color: '#6b7280' }}>Filter usage data by date range:</p>
			<Wrapper title='Usage Period' placeholder='Select analytics range' />
		</div>
	),
};
