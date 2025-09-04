import type { Meta, StoryObj } from '@storybook/react-vite';

import InviteCodeCopyBtn from '../common/InviteCodeCopyBtn';

const meta: Meta<typeof InviteCodeCopyBtn> = {
  title: 'Components/InviteCodeCopyBtn',
  component: InviteCodeCopyBtn,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    label: { control: 'text' },
    isCoupon: { control: 'boolean' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof InviteCodeCopyBtn>;

export const Playground: Story = {
  args: {
    text: 'INVITE-1234',
    label: '초대코드 복사하기',
    isCoupon: false,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InviteCodeCopyBtn text="INVITE-ABCD" />
      <InviteCodeCopyBtn text="COUPON-5678" isCoupon />
    </div>
  ),
};
