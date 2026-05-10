import type { Meta, StoryObj } from '@storybook/react';

interface Tier {
	upTo: number | null;
	unitAmount: string;
	flatAmount?: string;
}

interface PricingTierTableProps {
	meterName: string;
	currency?: string;
	tiers: Tier[];
}

const sym = (c: string) => ({ USD: '$', EUR: '€', GBP: '£', INR: '₹' })[c] || c;

const PricingTierTable = ({ meterName, currency = 'USD', tiers }: PricingTierTableProps) => (
	<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', maxWidth: '500px' }}>
		<div style={{ background: '#f9fafb', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
			<span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{meterName}</span>
			<span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>Tiered Pricing</span>
		</div>
		<table style={{ width: '100%', borderCollapse: 'collapse' }}>
			<thead>
				<tr style={{ background: '#f3f4f6' }}>
					<th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Range</th>
					<th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Per Unit</th>
					<th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Flat Fee</th>
				</tr>
			</thead>
			<tbody>
				{tiers.map((tier, i) => {
					const from = i === 0 ? 1 : (tiers[i - 1].upTo ?? 0) + 1;
					const to = tier.upTo === null ? '∞' : tier.upTo;
					return (
						<tr key={i} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
							<td style={{ padding: '10px 16px', fontSize: '13px', color: '#374151' }}>
								{from} - {to}
							</td>
							<td style={{ padding: '10px 16px', fontSize: '13px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>
								{sym(currency)}
								{tier.unitAmount}
							</td>
							<td style={{ padding: '10px 16px', fontSize: '13px', color: '#6b7280', textAlign: 'right' }}>
								{tier.flatAmount && Number(tier.flatAmount) > 0 ? sym(currency) + tier.flatAmount : '-'}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</div>
);

const meta: Meta<typeof PricingTierTable> = {
	title: 'Molecules/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		meterName: { control: 'text' },
		currency: { control: 'select', options: ['USD', 'EUR', 'GBP', 'INR'] },
	},
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

export const Default: Story = {
	args: {
		meterName: 'API Requests',
		currency: 'USD',
		tiers: [
			{ upTo: 1000, unitAmount: '0.00' },
			{ upTo: 10000, unitAmount: '0.002' },
			{ upTo: 100000, unitAmount: '0.001' },
			{ upTo: null, unitAmount: '0.0005' },
		],
	},
};

export const WithFlatFees: Story = {
	args: {
		meterName: 'SMS Messages',
		currency: 'USD',
		tiers: [
			{ upTo: 100, unitAmount: '0.05', flatAmount: '5.00' },
			{ upTo: 1000, unitAmount: '0.03', flatAmount: '2.00' },
			{ upTo: null, unitAmount: '0.01' },
		],
	},
};

export const TwoTier: Story = {
	args: {
		meterName: 'Emails Sent',
		currency: 'USD',
		tiers: [
			{ upTo: 10000, unitAmount: '0.00' },
			{ upTo: null, unitAmount: '0.001' },
		],
	},
};

export const EuroCurrency: Story = {
	args: {
		meterName: 'Storage GB',
		currency: 'EUR',
		tiers: [
			{ upTo: 50, unitAmount: '0.00' },
			{ upTo: 500, unitAmount: '0.02' },
			{ upTo: null, unitAmount: '0.01' },
		],
	},
};

export const MultipleTables: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
			<PricingTierTable
				meterName='API Requests'
				currency='USD'
				tiers={[
					{ upTo: 1000, unitAmount: '0.00' },
					{ upTo: null, unitAmount: '0.001' },
				]}
			/>
			<PricingTierTable
				meterName='Storage GB'
				currency='USD'
				tiers={[
					{ upTo: 5, unitAmount: '0.00' },
					{ upTo: null, unitAmount: '0.02' },
				]}
			/>
		</div>
	),
};
