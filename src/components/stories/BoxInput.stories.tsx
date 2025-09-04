import type { Meta, StoryObj } from '@storybook/react-vite';

import BoxInput from '../common/BoxInput';

const meta: Meta<typeof BoxInput> = {
  title: 'Components/BoxInput',
  component: BoxInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 1, max: 8 }, defaultValue: 6 },
    isPassword: { control: 'boolean' },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    focusColorClass: { control: 'text' },
    onComplete: { action: 'complete' },
    onChange: { action: 'change' },
  },
};
export default meta;

type Story = StoryObj<typeof BoxInput>;

export const Playground: Story = {
  args: {
    length: 6,
    isPassword: false,
    align: 'center',
    focusColorClass: 'focus:border-theme-primary',
  },
};

/* ✅ Showcase */
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div>
        <p className="mb-2 font-semibold">기본 6자리 입력</p>
        <BoxInput length={6} />
      </div>
      <div>
        <p className="mb-2 font-semibold">비밀번호 모드</p>
        <BoxInput length={6} isPassword />
      </div>
      <div>
        <p className="mb-2 font-semibold">왼쪽 정렬</p>
        <BoxInput length={4} align="start" />
      </div>
      <div>
        <p className="mb-2 font-semibold">오른쪽 정렬</p>
        <BoxInput length={4} align="end" />
      </div>
    </div>
  ),
};
