import type { Meta, StoryObj } from '@storybook/react-vite';

import empty from '@/assets/common/empty.svg';

import EmptyStateMessage from '../common/EmptyStateMessage';

const meta: Meta<typeof EmptyStateMessage> = {
  title: 'Components/EmptyStateMessage',
  component: EmptyStateMessage,
  tags: ['autodocs'],
  argTypes: {
    iconSrc: { control: 'text' },
    iconAlt: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconColor: { control: 'text' },
    titleColor: { control: 'text' },
    subtitleColor: { control: 'text' },
    subtitleFont: {
      control: 'select',
      options: ['regular', 'bold'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof EmptyStateMessage>;

export const Playground: Story = {
  args: {
    iconSrc: empty,
    iconAlt: '빈 상태',
    title: '아직 데이터가 없습니다',
    subtitle: '새로운 항목을 추가해 보세요',
    iconSize: 'md',
    subtitleFont: 'regular',
  },
};

export const Showcase: Story = {
  args: {
    iconSrc: '',
    iconAlt: '',
    title: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎgkdlgkdl',
    subtitle: '하이하이',
    subtitleFont: 'bold',
  },

  render: () => (
    <div className="flex w-full flex-col items-center gap-12">
      <EmptyStateMessage
        title="데이터 없음"
        subtitle="리스트가 비어 있어요"
        iconSize="sm"
      />
      <EmptyStateMessage
        title="검색 결과 없음"
        subtitle="다른 키워드를 입력해 보세요"
        iconSize="md"
      />
      <EmptyStateMessage
        title="알림 없음"
        subtitle="새 알림이 표시되면 알려드릴게요"
        iconSize="lg"
        subtitleFont="bold"
      />
    </div>
  ),
};
