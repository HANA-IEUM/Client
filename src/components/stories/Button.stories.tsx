import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: [
        'disable',
        'gray',
        'green',
        'red',
        'mint',
        'yellow',
        'pink',
        'silver',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full', 'full-lg'],
    },
    font: {
      control: 'select',
      options: ['regular', 'medium', 'bold'],
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    label: 'Default Button',
    intent: 'gray',
    size: 'md',
    font: 'bold',
    radius: 'lg',
    disabled: false,
    loading: false,
  },
};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button intent="disable" label="Disable" />
      <Button intent="gray" label="Gray" />
      <Button intent="green" label="Green" />
      <Button intent="red" label="Red" />
      <Button intent="mint" label="Mint" />
      <Button intent="yellow" label="Yellow" />
      <Button intent="pink" label="Pink" />
      <Button intent="silver" label="Silver" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-3">
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
      <Button size="xl" label="XL" />
      <Button size="full" label="Full width" />
      <Button size="full-lg" label="Full Large" />
    </div>
  ),
};

export const Fonts: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button font="regular" label="Regular Font" />
      <Button font="medium" label="Medium Font" />
      <Button font="bold" label="Bold Font" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button radius="sm" label="sm" />
      <Button radius="md" label="md" />
      <Button radius="lg" label="lg" />
      <Button radius="xl" label="xl" />
      <Button radius="full" label="full" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button label="Disabled" disabled />
      <Button label="Loading" loading intent="green" />
    </div>
  ),
};
