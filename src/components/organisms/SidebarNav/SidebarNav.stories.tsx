import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Layers2, Landmark, BarChart3, Settings, CodeXml, Puzzle, ChevronDown, ChevronRight } from 'lucide-react';

interface NavSubItem {
	title: string;
	url: string;
}

interface NavItem {
	title: string;
	url: string;
	icon: any;
	items?: NavSubItem[];
}

interface SidebarNavProps {
	collapsed?: boolean;
	activeRoute?: string;
}

const navItems: NavItem[] = [
	{ title: 'Home', url: '/dashboard', icon: Home },
	{
		title: 'Product Catalog',
		url: '/features',
		icon: Layers2,
		items: [
			{ title: 'Features', url: '/features' },
			{ title: 'Plans', url: '/plans' },
			{ title: 'Coupons', url: '/coupons' },
		],
	},
	{
		title: 'Billing',
		url: '/customers',
		icon: Landmark,
		items: [
			{ title: 'Customers', url: '/customers' },
			{ title: 'Subscriptions', url: '/subscriptions' },
			{ title: 'Invoices', url: '/invoices' },
		],
	},
	{ title: 'Revenue', url: '/revenue', icon: BarChart3 },
	{
		title: 'Developers',
		url: '/events',
		icon: CodeXml,
		items: [
			{ title: 'API Keys', url: '/api-keys' },
			{ title: 'Webhooks', url: '/webhooks' },
		],
	},
	{ title: 'Integrations', url: '/integrations', icon: Puzzle },
	{ title: 'Settings', url: '/settings', icon: Settings },
];

const SidebarNav = ({ collapsed = false, activeRoute = '/dashboard' }: SidebarNavProps) => {
	const [openItems, setOpenItems] = useState<string[]>(['Product Catalog']);
	const toggle = (title: string) => {
		setOpenItems((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
	};

	return (
		<div
			style={{
				width: collapsed ? '56px' : '240px',
				height: '100vh',
				background: '#f9f9f9',
				borderRight: '1.5px solid #e5e7eb',
				padding: collapsed ? '8px 4px' : '8px 12px',
				transition: 'width 0.2s ease',
				fontFamily: 'sans-serif',
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',
			}}>
			{/* Logo area */}
			<div style={{ padding: '12px 8px', marginBottom: '8px', borderBottom: '1px solid #e5e7eb' }}>
				{collapsed ? (
					<div style={{ width: '28px', height: '28px', background: '#092E44', borderRadius: '6px' }} />
				) : (
					<span style={{ fontSize: '15px', fontWeight: 700, color: '#092E44' }}>FlexPrice</span>
				)}
			</div>

			{navItems.map((item) => {
				const Icon = item.icon;
				const isOpen = openItems.includes(item.title);
				const isActive = activeRoute === item.url || item.items?.some((s) => s.url === activeRoute);

				return (
					<div key={item.title}>
						<div
							onClick={() => (item.items ? toggle(item.title) : null)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								padding: collapsed ? '8px' : '7px 10px',
								borderRadius: '7px',
								cursor: 'pointer',
								background: isActive ? '#e8f0f7' : 'transparent',
								color: isActive ? '#092E44' : '#57646E',
								fontWeight: isActive ? 600 : 400,
								fontSize: '13.5px',
								justifyContent: collapsed ? 'center' : 'space-between',
							}}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<Icon size={16} />
								{!collapsed && <span>{item.title}</span>}
							</div>
							{!collapsed && item.items && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
						</div>

						{!collapsed && item.items && isOpen && (
							<div style={{ marginLeft: '28px', marginTop: '2px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
								{item.items.map((sub) => (
									<div
										key={sub.title}
										style={{
											padding: '6px 10px',
											borderRadius: '6px',
											fontSize: '13px',
											cursor: 'pointer',
											color: activeRoute === sub.url ? '#092E44' : '#6b7280',
											fontWeight: activeRoute === sub.url ? 600 : 400,
											background: activeRoute === sub.url ? '#e8f0f7' : 'transparent',
										}}>
										{sub.title}
									</div>
								))}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	argTypes: {
		collapsed: { control: 'boolean', description: 'Collapse sidebar to icon-only mode' },
		activeRoute: {
			control: 'select',
			options: ['/dashboard', '/features', '/plans', '/customers', '/subscriptions', '/invoices', '/revenue', '/integrations', '/settings'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
	args: { collapsed: false, activeRoute: '/dashboard' },
};

export const Collapsed: Story = {
	args: { collapsed: true, activeRoute: '/dashboard' },
};

export const ActiveBilling: Story = {
	args: { collapsed: false, activeRoute: '/invoices' },
};

export const ActiveCatalog: Story = {
	args: { collapsed: false, activeRoute: '/plans' },
};

export const FullLayout: Story = {
	render: () => (
		<div style={{ display: 'flex', height: '100vh' }}>
			<SidebarNav collapsed={false} activeRoute='/dashboard' />
			<div style={{ flex: 1, padding: '32px', background: 'white' }}>
				<h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>Dashboard</h2>
				<p style={{ color: '#6b7280', marginTop: '8px' }}>Main content area</p>
			</div>
		</div>
	),
};
