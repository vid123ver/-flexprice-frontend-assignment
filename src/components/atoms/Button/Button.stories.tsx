import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon, TrashIcon, ArrowRightIcon } from 'lucide-react';
import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'xs', 'icon'],
		},
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		children: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Create Plan',
		variant: 'default',
		size: 'default',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-3 p-4'>
			<Button variant='default'>Default</Button>
			<Button variant='black'>Black</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	),
};

export const Loading: Story = {
	args: {
		children: 'Saving...',
		isLoading: true,
		variant: 'default',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Cannot Click',
		disabled: true,
		variant: 'default',
	},
};

export const WithPrefixIcon: Story = {
	args: {
		children: 'Add Customer',
		prefixIcon: <PlusIcon />,
		variant: 'default',
	},
};

export const DangerButton: Story = {
	args: {
		children: 'Delete Invoice',
		prefixIcon: <TrashIcon />,
		variant: 'destructive',
	},
};
