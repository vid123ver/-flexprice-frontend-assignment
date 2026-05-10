import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

type SubscriptionStatus = 'active' | 'cancelled' | 'pending' | 'expired' | 'trialing';

interface Subscription {
	id: string;
	customer: string;
	email: string;
	plan: string;
	status: SubscriptionStatus;
	amount: string;
	startDate: string;
	nextBilling: string;
}

const STATUS_STYLES: Record<SubscriptionStatus, { bg: string; color: string; label: string }> = {
	active: { bg: '#ECFBE4', color: '#377E6A', label: 'Active' },
	cancelled: { bg: '#FEE2E2', color: '#DC2626', label: 'Cancelled' },
	pending: { bg: '#FFF7ED', color: '#C2410C', label: 'Pending' },
	expired: { bg: '#F0F2F5', color: '#57646E', label: 'Expired' },
	trialing: { bg: '#EFF8FF', color: '#2F6FE2', label: 'Trialing' },
};

const MOCK_DATA: Subscription[] = [
	{
		id: 'sub_001',
		customer: 'Acme Corp',
		email: 'billing@acme.com',
		plan: 'Enterprise',
		status: 'active',
		amount: '$499/mo',
		startDate: 'Jan 1, 2025',
		nextBilling: 'Jun 1, 2025',
	},
	{
		id: 'sub_002',
		customer: 'Globex Inc',
		email: 'admin@globex.com',
		plan: 'Pro',
		status: 'active',
		amount: '$49/mo',
		startDate: 'Feb 15, 2025',
		nextBilling: 'Jun 15, 2025',
	},
	{
		id: 'sub_003',
		customer: 'Initech LLC',
		email: 'it@initech.com',
		plan: 'Starter',
		status: 'trialing',
		amount: '$0/mo',
		startDate: 'May 1, 2025',
		nextBilling: 'Jun 1, 2025',
	},
	{
		id: 'sub_004',
		customer: 'Umbrella Ltd',
		email: 'ops@umbrella.com',
		plan: 'Pro',
		status: 'cancelled',
		amount: '$49/mo',
		startDate: 'Mar 1, 2025',
		nextBilling: '-',
	},
	{
		id: 'sub_005',
		customer: 'Stark Industries',
		email: 'tony@stark.com',
		plan: 'Enterprise',
		status: 'active',
		amount: '$499/mo',
		startDate: 'Jan 10, 2025',
		nextBilling: 'Jun 10, 2025',
	},
	{
		id: 'sub_006',
		customer: 'Wayne Enterprises',
		email: 'bruce@wayne.com',
		plan: 'Starter',
		status: 'pending',
		amount: '$19/mo',
		startDate: 'May 10, 2025',
		nextBilling: 'Jun 10, 2025',
	},
	{
		id: 'sub_007',
		customer: 'Dunder Mifflin',
		email: 'michael@dunderm.com',
		plan: 'Pro',
		status: 'expired',
		amount: '$49/mo',
		startDate: 'Nov 1, 2024',
		nextBilling: '-',
	},
];

const StatusChip = ({ status }: { status: SubscriptionStatus }) => {
	const s = STATUS_STYLES[status];
	return (
		<span style={{ background: s.bg, color: s.color, padding: '2px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 500 }}>
			{s.label}
		</span>
	);
};

interface SubscriptionTableProps {
	loading?: boolean;
	filterStatus?: SubscriptionStatus | 'all';
	showSearch?: boolean;
}

const SubscriptionTable = ({ loading = false, filterStatus = 'all', showSearch = true }: SubscriptionTableProps) => {
	const [search, setSearch] = useState('');
	const [sortField, setSortField] = useState<keyof Subscription>('customer');
	const [sortAsc, setSortAsc] = useState(true);

	const handleSort = (field: keyof Subscription) => {
		if (sortField === field) setSortAsc((p) => !p);
		else {
			setSortField(field);
			setSortAsc(true);
		}
	};

	const filtered = MOCK_DATA.filter((s) => filterStatus === 'all' || s.status === filterStatus)
		.filter(
			(s) => !search || s.customer.toLowerCase().includes(search.toLowerCase()) || s.plan.toLowerCase().includes(search.toLowerCase()),
		)
		.sort((a, b) => {
			const av = a[sortField];
			const bv = b[sortField];
			return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
		});

	const th = (label: string, field?: keyof Subscription) => (
		<th
			onClick={() => field && handleSort(field)}
			style={{
				padding: '10px 16px',
				textAlign: 'left',
				fontSize: '12px',
				color: '#6b7280',
				fontWeight: 500,
				borderBottom: '1px solid #f3f4f6',
				cursor: field ? 'pointer' : 'default',
				whiteSpace: 'nowrap',
				userSelect: 'none',
			}}>
			{label} {field && sortField === field ? (sortAsc ? '↑' : '↓') : ''}
		</th>
	);

	if (loading)
		return (
			<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
				{[1, 2, 3, 4].map((i) => (
					<div key={i} style={{ display: 'flex', gap: '16px', padding: '14px 16px', borderBottom: '1px solid #f9fafb' }}>
						{[120, 80, 60, 80, 60].map((w, j) => (
							<div key={j} style={{ height: '14px', width: w, background: '#f3f4f6', borderRadius: '4px' }} />
						))}
					</div>
				))}
			</div>
		);

	return (
		<div style={{ fontFamily: 'sans-serif', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
			{showSearch && (
				<div
					style={{
						padding: '12px 16px',
						borderBottom: '1px solid #f3f4f6',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Subscriptions</span>
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Search customer or plan...'
						style={{
							padding: '6px 12px',
							border: '1px solid #e5e7eb',
							borderRadius: '6px',
							fontSize: '13px',
							outline: 'none',
							width: '220px',
						}}
					/>
				</div>
			)}
			{filtered.length === 0 ? (
				<div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>No subscriptions found</div>
			) : (
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr style={{ background: '#f9fafb' }}>
							{th('Customer', 'customer')}
							{th('Plan', 'plan')}
							{th('Status', 'status')}
							{th('Amount', 'amount')}
							{th('Start Date', 'startDate')}
							{th('Next Billing', 'nextBilling')}
						</tr>
					</thead>
					<tbody>
						{filtered.map((s, i) => (
							<tr key={s.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
								<td style={{ padding: '12px 16px' }}>
									<div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{s.customer}</div>
									<div style={{ fontSize: '12px', color: '#6b7280' }}>{s.email}</div>
								</td>
								<td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{s.plan}</td>
								<td style={{ padding: '12px 16px' }}>
									<StatusChip status={s.status} />
								</td>
								<td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>{s.amount}</td>
								<td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{s.startDate}</td>
								<td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{s.nextBilling}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>
				Showing {filtered.length} of {MOCK_DATA.length} subscriptions
			</div>
		</div>
	);
};

const meta: Meta<typeof SubscriptionTable> = {
	title: 'Organisms/SubscriptionTable',
	component: SubscriptionTable,
	tags: ['autodocs'],
	argTypes: {
		loading: { control: 'boolean' },
		showSearch: { control: 'boolean' },
		filterStatus: { control: 'select', options: ['all', 'active', 'cancelled', 'pending', 'expired', 'trialing'] },
	},
};

export default meta;
type Story = StoryObj<typeof SubscriptionTable>;

export const Default: Story = {
	args: { loading: false, filterStatus: 'all', showSearch: true },
};

export const LoadingSkeleton: Story = {
	args: { loading: true },
};

export const ActiveOnly: Story = {
	args: { filterStatus: 'active', showSearch: true },
};

export const CancelledOnly: Story = {
	args: { filterStatus: 'cancelled', showSearch: true },
};

export const WithoutSearch: Story = {
	args: { showSearch: false, filterStatus: 'all' },
};

export const EmptyState: Story = {
	args: { filterStatus: 'expired', showSearch: false },
};
