import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from '../input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['green', 'red'],
    },
    font: {
      control: 'select',
      options: ['regular', 'bold'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력하세요',
    intent: 'green',
    font: 'regular',
    disabled: false,
    error: '',
    helperText: '',
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Input label="기본 입력" placeholder="기본 입력" />
      <Input
        label="에러 상태"
        placeholder="에러 발생"
        error="아이디를 입력해주세요."
      />
      <Input
        label="도움말 있는 입력"
        placeholder="헬퍼 텍스트 예시"
        helperText="8자 이상 입력하세요."
      />
      <Input label="비활성화 입력" placeholder="입력 불가" disabled />
      <Input label="굵은 폰트" placeholder="Bold font" font="bold" />
      <Input label="Red Intent" placeholder="Red border" intent="red" />
    </div>
  ),
};
