import type { Meta, StoryObj } from '@storybook/react-vite';

import ToastCard from '../common/ToastCard';
const meta: Meta<typeof ToastCard> = {
  title: 'Components/ToastCard',
  component: ToastCard,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: 'select',
      options: ['success', 'error'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToastCard>;

export const Playground: Story = {
  args: {
    message: '정상적으로 처리되었습니다.',
    variant: 'success',
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ToastCard message="정상적으로 처리되었습니다." variant="success" />
      <ToastCard message="오류가 발생했습니다." variant="error" />
    </div>
  ),
};
