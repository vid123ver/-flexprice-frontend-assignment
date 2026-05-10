import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

interface PaginationProps {
	totalPages: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage = 1, onPageChange }: PaginationProps) => {
	const getPageNumbers = () => {
		const pages: (number | 'ellipsis')[] = [1];
		if (totalPages <= 10) {
			for (let i = 2; i <= totalPages; i++) pages.push(i);
		} else {
			const left = Math.max(currentPage - 2, 2);
			const right = Math.min(currentPage + 2, totalPages - 1);
			if (left > 2) pages.push('ellipsis');
			for (let i = left; i <= right; i++) pages.push(i);
			if (right < totalPages - 1) pages.push('ellipsis');
			if (right < totalPages) pages.push(totalPages);
		}
		return pages;
	};

	const btn = (active: boolean, disabled: boolean) => ({
		padding: '6px 12px',
		borderRadius: '6px',
		border: '1px solid #e5e7eb',
		background: active ? '#092E44' : 'white',
		color: active ? 'white' : disabled ? '#9ca3af' : '#374151',
		cursor: disabled ? 'not-allowed' : 'pointer',
		fontSize: '13px',
		fontWeight: active ? 600 : 400,
		minWidth: '36px',
		textAlign: 'center' as const,
	});

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'sans-serif' }}>
			<button style={btn(false, currentPage === 1)} disabled={currentPage === 1} onClick={() => onPageChange?.(currentPage - 1)}>
				Previous
			</button>

			{getPageNumbers().map((p, i) =>
				p === 'ellipsis' ? (
					<span key={'e' + i} style={{ padding: '6px 8px', color: '#6b7280' }}>
						...
					</span>
				) : (
					<button key={p} style={btn(currentPage === p, false)} onClick={() => onPageChange?.(p as number)}>
						{p}
					</button>
				),
			)}

			<button
				style={btn(false, currentPage === totalPages)}
				disabled={currentPage === totalPages}
				onClick={() => onPageChange?.(currentPage + 1)}>
				Next
			</button>
		</div>
	);
};

const InteractivePagination = (args: any) => {
	const [page, setPage] = useState(args.currentPage || 1);
	return (
		<div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<p style={{ fontSize: '13px', color: '#6b7280' }}>
				Current page: <strong>{page}</strong> of {args.totalPages}
			</p>
			<Pagination {...args} currentPage={page} onPageChange={setPage} />
		</div>
	);
};

const meta: Meta<typeof Pagination> = {
	title: 'Molecules/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	argTypes: {
		totalPages: { control: 'number' },
		currentPage: { control: 'number' },
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	render: (args) => <InteractivePagination {...args} />,
	args: { totalPages: 10, currentPage: 1 },
};

export const FewPages: Story = {
	render: (args) => <InteractivePagination {...args} />,
	args: { totalPages: 3, currentPage: 1 },
};

export const ManyPages: Story = {
	render: (args) => <InteractivePagination {...args} />,
	args: { totalPages: 50, currentPage: 25 },
};

export const FirstPage: Story = {
	render: (args) => <InteractivePagination {...args} />,
	args: { totalPages: 20, currentPage: 1 },
};

export const LastPage: Story = {
	render: (args) => <InteractivePagination {...args} />,
	args: { totalPages: 20, currentPage: 20 },
};

export const InvoicesPagination: Story = {
	render: () => (
		<div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<p style={{ fontSize: '13px', color: '#6b7280' }}>Showing 25 of 340 invoices</p>
			<InteractivePagination totalPages={14} currentPage={1} />
		</div>
	),
};
