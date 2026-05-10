import type { Meta, StoryObj } from '@storybook/react';
import FlexPriceSelect from './Select';

const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		error: { control: 'text' },
		description: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const planOptions = [
	{ value: 'starter', label: 'Starter Plan' },
	{ value: 'pro', label: 'Pro Plan' },
	{ value: 'enterprise', label: 'Enterprise Plan' },
];

const statusOptions = [
	{ value: 'active', label: 'Active' },
	{ value: 'archived', label: 'Archived' },
	{ value: 'draft', label: 'Draft' },
];

const currencyOptions = [
	{ value: 'usd', label: 'USD - US Dollar' },
	{ value: 'eur', label: 'EUR - Euro' },
	{ value: 'gbp', label: 'GBP - British Pound' },
	{ value: 'inr', label: 'INR - Indian Rupee' },
];

const optionsWithDescription = [
	{ value: 'flat', label: 'Flat Rate', description: 'Charge a fixed price per unit' },
	{ value: 'tiered', label: 'Tiered Pricing', description: 'Different price per tier of usage' },
	{ value: 'volume', label: 'Volume Pricing', description: 'Price based on total volume' },
];

export const Default: Story = {
	args: {
		options: planOptions,
		placeholder: 'Select a plan',
		label: 'Plan',
	},
};

export const WithLabel: Story = {
	args: {
		options: planOptions,
		placeholder: 'Select a plan',
		label: 'Billing Plan',
		required: true,
	},
};

export const WithDescription: Story = {
	args: {
		options: currencyOptions,
		placeholder: 'Select currency',
		label: 'Currency',
		description: 'This will be used for all invoices',
	},
};

export const WithError: Story = {
	args: {
		options: planOptions,
		placeholder: 'Select a plan',
		label: 'Plan',
		error: 'Please select a plan to continue',
	},
};

export const Disabled: Story = {
	args: {
		options: planOptions,
		placeholder: 'Select a plan',
		label: 'Plan',
		disabled: true,
		value: 'starter',
	},
};

export const RadioStyle: Story = {
	args: {
		options: statusOptions,
		placeholder: 'Select status',
		label: 'Status',
		isRadio: true,
	},
};

export const WithOptionsDescription: Story = {
	args: {
		options: optionsWithDescription,
		placeholder: 'Select pricing model',
		label: 'Pricing Model',
	},
};

export const NoOptions: Story = {
	args: {
		options: [],
		placeholder: 'Select a plan',
		label: 'Plan',
		noOptionsText: 'No plans available',
	},
};

export const PreSelected: Story = {
	args: {
		options: currencyOptions,
		label: 'Currency',
		value: 'usd',
	},
};
