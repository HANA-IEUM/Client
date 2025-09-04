import type { Meta, StoryObj } from '@storybook/react-vite';

import AccountItem from '../AccountItem';

const meta: Meta<typeof AccountItem> = {
  title: 'Components/AccountItem',
  component: AccountItem,
  tags: ['autodocs'],
  argTypes: {
    accountName: { control: 'text' },
    accountNum: { control: 'text' },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof AccountItem>;

export const Playground: Story = {
  args: {
    accountName: '달달 하나 통장',
    accountNum: '352-1022-1234-12',
    selected: false,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-4">
      <AccountItem
        accountName="달달 하나 통장"
        accountNum="352-1022-1234-12"
        selected={false}
      />
      <AccountItem
        accountName="달달 하나 통장"
        accountNum="352-1022-1234-12"
        selected={true}
      />
    </div>
  ),
};
