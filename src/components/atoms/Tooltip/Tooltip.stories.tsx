import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '@/components/atoms/Button/Button';

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
		align: { control: 'select', options: ['start', 'center', 'end'] },
		delayDuration: { control: 'number' },
		sideOffset: { control: 'number' },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='This is a tooltip'>
				<Button variant='outline'>Hover me</Button>
			</Tooltip>
		</div>
	),
};

export const TopSide: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='Tooltip on top' side='top'>
				<Button variant='outline'>Top</Button>
			</Tooltip>
		</div>
	),
};

export const BottomSide: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='Tooltip on bottom' side='bottom'>
				<Button variant='outline'>Bottom</Button>
			</Tooltip>
		</div>
	),
};

export const LeftSide: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='Tooltip on left' side='left'>
				<Button variant='outline'>Left</Button>
			</Tooltip>
		</div>
	),
};

export const RightSide: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='Tooltip on right' side='right'>
				<Button variant='outline'>Right</Button>
			</Tooltip>
		</div>
	),
};

export const WithDelay: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='I appear after 800ms delay' delayDuration={800}>
				<Button variant='outline'>Hover (delayed)</Button>
			</Tooltip>
		</div>
	),
};

export const AllSides: Story = {
	render: () => (
		<div style={{ padding: '80px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
			<Tooltip content='Top tooltip' side='top'>
				<Button variant='outline'>Top</Button>
			</Tooltip>
			<Tooltip content='Bottom tooltip' side='bottom'>
				<Button variant='outline'>Bottom</Button>
			</Tooltip>
			<Tooltip content='Left tooltip' side='left'>
				<Button variant='outline'>Left</Button>
			</Tooltip>
			<Tooltip content='Right tooltip' side='right'>
				<Button variant='outline'>Right</Button>
			</Tooltip>
		</div>
	),
};

export const InformationalTooltip: Story = {
	render: () => (
		<div style={{ padding: '64px', display: 'flex', justifyContent: 'center' }}>
			<Tooltip content='Usage is calculated per billing cycle and resets monthly'>
				<span style={{ fontSize: '13px', color: '#6b7280', borderBottom: '1px dashed #9ca3af', cursor: 'help' }}>What is usage?</span>
			</Tooltip>
		</div>
	),
};
