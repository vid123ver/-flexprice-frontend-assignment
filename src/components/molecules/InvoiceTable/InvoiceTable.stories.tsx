import type { Meta, StoryObj } from '@storybook/react';

type InvoiceStatus = 'draft' | 'finalized' | 'voided';
type PaymentStatus = 'paid' | 'unpaid' | 'pending' | 'failed';

interface Invoice {
	id: string;
	invoiceNumber: string;
	customer: string;
	plan: string;
	status: InvoiceStatus;
	paymentStatus: PaymentStatus;
	billingPeriod: string;
	total: string;
	amountDue: string;
	currency: string;
}

const STATUS_STYLES: Record<InvoiceStatus, { bg: string; color: string }> = {
	draft: { bg: '#FFF7ED', color: '#C2410C' },
	finalized: { bg: '#EFF8FF', color: '#2F6FE2' },
	voided: { bg: '#F0F2F5', color: '#57646E' },
};

const PAYMENT_STYLES: Record<PaymentStatus, { bg: string; color: string }> = {
	paid: { bg: '#ECFBE4', color: '#377E6A' },
	unpaid: { bg: '#FEE2E2', color: '#DC2626' },
	pending: { bg: '#FFF7ED', color: '#C2410C' },
	failed: { bg: '#FEE2E2', color: '#DC2626' },
};

const Chip = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
	<span style={{ background: bg, color, padding: '2px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 500 }}>{label}</span>
);

const MOCK_INVOICES: Invoice[] = [
	{
		id: '1',
		invoiceNumber: 'INV-001',
		customer: 'Acme Corp',
		plan: 'Enterprise',
		status: 'finalized',
		paymentStatus: 'paid',
		billingPeriod: 'Jan 1 - Jan 31, 2025',
		total: '$499.00',
		amountDue: '$0.00',
		currency: 'USD',
	},
	{
		id: '2',
		invoiceNumber: 'INV-002',
		customer: 'Globex Inc',
		plan: 'Pro',
		status: 'finalized',
		paymentStatus: 'unpaid',
		billingPeriod: 'Jan 1 - Jan 31, 2025',
		total: '$49.00',
		amountDue: '$49.00',
		currency: 'USD',
	},
	{
		id: '3',
		invoiceNumber: '',
		customer: 'Initech LLC',
		plan: 'Starter',
		status: 'draft',
		paymentStatus: 'pending',
		billingPeriod: 'Feb 1 - Feb 28, 2025',
		total: '$19.00',
		amountDue: '$19.00',
		currency: 'USD',
	},
	{
		id: '4',
		invoiceNumber: 'INV-003',
		customer: 'Umbrella Ltd',
		plan: 'Pro',
		status: 'voided',
		paymentStatus: 'failed',
		billingPeriod: 'Jan 1 - Jan 31, 2025',
		total: '$49.00',
		amountDue: '$49.00',
		currency: 'USD',
	},
	{
		id: '5',
		invoiceNumber: 'INV-004',
		customer: 'Stark Industries',
		plan: 'Enterprise',
		status: 'finalized',
		paymentStatus: 'paid',
		billingPeriod: 'Feb 1 - Feb 28, 2025',
		total: '$499.00',
		amountDue: '$0.00',
		currency: 'USD',
	},
];

interface InvoiceTableProps {
	data?: Invoice[];
	loading?: boolean;
}

const InvoiceTable = ({ data = MOCK_INVOICES, loading = false }: InvoiceTableProps) => {
	const th = (label: string) => (
		<th
			style={{
				padding: '10px 16px',
				textAlign: 'left',
				fontSize: '12px',
				color: '#6b7280',
				fontWeight: 500,
				borderBottom: '1px solid #f3f4f6',
				whiteSpace: 'nowrap',
			}}>
			{label}
		</th>
	);

	if (loading)
		return (
			<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
				{[1, 2, 3, 4].map((i) => (
					<div key={i} style={{ display: 'flex', gap: '16px', padding: '14px 16px', borderBottom: '1px solid #f9fafb' }}>
						{[100, 80, 70, 80, 120, 70, 70].map((w, j) => (
							<div key={j} style={{ height: '14px', width: w, background: '#f3f4f6', borderRadius: '4px' }} />
						))}
					</div>
				))}
			</div>
		);

	if (data.length === 0)
		return (
			<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '48px', textAlign: 'center' }}>
				<p style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>No invoices yet</p>
				<p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Invoices will appear here once customers are billed.</p>
			</div>
		);

	return (
		<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr style={{ background: '#f9fafb' }}>
						{th('Invoice Number')}
						{th('Customer')}
						{th('Plan')}
						{th('Status')}
						{th('Payment Status')}
						{th('Billing Period')}
						{th('Total')}
						{th('Amount Due')}
					</tr>
				</thead>
				<tbody>
					{data.map((inv, i) => (
						<tr
							key={inv.id}
							style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa', cursor: 'pointer' }}
							onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
							onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#fafafa')}>
							<td style={{ padding: '12px 16px', fontSize: '13px' }}>
								{inv.status === 'draft' ? (
									<span style={{ color: '#9ca3af', fontStyle: 'italic' }}>To be generated</span>
								) : (
									<span style={{ color: '#111827', fontWeight: 500 }}>{inv.invoiceNumber || '--'}</span>
								)}
							</td>
							<td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{inv.customer}</td>
							<td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{inv.plan}</td>
							<td style={{ padding: '12px 16px' }}>
								<Chip label={inv.status.charAt(0).toUpperCase() + inv.status.slice(1)} {...STATUS_STYLES[inv.status]} />
							</td>
							<td style={{ padding: '12px 16px' }}>
								<Chip
									label={inv.paymentStatus.charAt(0).toUpperCase() + inv.paymentStatus.slice(1)}
									{...PAYMENT_STYLES[inv.paymentStatus]}
								/>
							</td>
							<td style={{ padding: '12px 16px', fontSize: '12px', color: '#6b7280' }}>{inv.billingPeriod}</td>
							<td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500, color: '#111827' }}>{inv.total}</td>
							<td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{inv.amountDue}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>
				Showing {data.length} invoices
			</div>
		</div>
	);
};

const meta: Meta<typeof InvoiceTable> = {
	title: 'Molecules/InvoiceTable',
	component: InvoiceTable,
	tags: ['autodocs'],
	argTypes: {
		loading: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof InvoiceTable>;

export const Default: Story = {
	args: { data: MOCK_INVOICES, loading: false },
};

export const Loading: Story = {
	args: { loading: true },
};

export const EmptyState: Story = {
	args: { data: [], loading: false },
};

export const PaidOnly: Story = {
	args: { data: MOCK_INVOICES.filter((i) => i.paymentStatus === 'paid') },
};

export const UnpaidOnly: Story = {
	args: { data: MOCK_INVOICES.filter((i) => i.paymentStatus === 'unpaid') },
};

export const SingleInvoice: Story = {
	args: { data: [MOCK_INVOICES[0]] },
};
