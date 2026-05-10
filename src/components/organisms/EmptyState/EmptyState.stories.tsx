import type { Meta, StoryObj } from '@storybook/react';
import { FileX, Users, Receipt, CreditCard, BarChart3, Plus, Upload } from 'lucide-react';

interface EmptyStateProps {
	icon?: 'invoices' | 'customers' | 'plans' | 'credits' | 'analytics' | 'default';
	headline?: string;
	subtext?: string;
	ctaLabel?: string;
	onCtaClick?: () => void;
}

const ICONS = {
	invoices: Receipt,
	customers: Users,
	plans: CreditCard,
	credits: CreditCard,
	analytics: BarChart3,
	default: FileX,
};

const EmptyState = ({
	icon = 'default',
	headline = 'No data found',
	subtext = 'There is nothing here yet.',
	ctaLabel,
	onCtaClick,
}: EmptyStateProps) => {
	const Icon = ICONS[icon];
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '64px 32px',
				textAlign: 'center',
				fontFamily: 'sans-serif',
			}}>
			<div
				style={{
					width: '64px',
					height: '64px',
					borderRadius: '16px',
					background: '#f3f4f6',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: '20px',
				}}>
				<Icon size={28} color='#9ca3af' />
			</div>
			<h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>{headline}</h3>
			<p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', maxWidth: '320px', lineHeight: 1.5 }}>{subtext}</p>
			{ctaLabel && (
				<button
					onClick={onCtaClick}
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '6px',
						padding: '8px 16px',
						background: '#092E44',
						color: 'white',
						border: 'none',
						borderRadius: '7px',
						fontSize: '13px',
						fontWeight: 500,
						cursor: 'pointer',
					}}>
					<Plus size={14} />
					{ctaLabel}
				</button>
			)}
		</div>
	);
};

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	argTypes: {
		icon: { control: 'select', options: ['default', 'invoices', 'customers', 'plans', 'credits', 'analytics'] },
		headline: { control: 'text' },
		subtext: { control: 'text' },
		ctaLabel: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
	args: {
		icon: 'default',
		headline: 'No data found',
		subtext: 'There is nothing here yet. Get started by creating your first item.',
		ctaLabel: 'Create New',
	},
};

export const NoInvoices: Story = {
	args: {
		icon: 'invoices',
		headline: 'No invoices yet',
		subtext: 'Invoices will appear here once customers are billed for their subscriptions.',
		ctaLabel: 'Create Invoice',
	},
};

export const NoCustomers: Story = {
	args: {
		icon: 'customers',
		headline: 'No customers found',
		subtext: 'Add your first customer to start managing subscriptions and billing.',
		ctaLabel: 'Add Customer',
	},
};

export const NoPlans: Story = {
	args: {
		icon: 'plans',
		headline: 'No plans created',
		subtext: 'Create pricing plans to offer your customers flexible billing options.',
		ctaLabel: 'Create Plan',
	},
};

export const NoAnalytics: Story = {
	args: {
		icon: 'analytics',
		headline: 'No analytics data',
		subtext: 'Analytics will appear here once your customers start using your product.',
	},
};

export const WithoutCTA: Story = {
	args: {
		icon: 'default',
		headline: 'No results found',
		subtext: 'Try adjusting your search or filter to find what you are looking for.',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
			{[
				{ icon: 'invoices' as const, headline: 'No Invoices', subtext: 'No invoices yet', ctaLabel: 'Create Invoice' },
				{ icon: 'customers' as const, headline: 'No Customers', subtext: 'No customers yet', ctaLabel: 'Add Customer' },
				{ icon: 'plans' as const, headline: 'No Plans', subtext: 'No plans yet', ctaLabel: 'Create Plan' },
			].map((props) => (
				<div key={props.icon} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', width: '280px' }}>
					<EmptyState {...props} />
				</div>
			))}
		</div>
	),
};
