import type { Meta, StoryObj } from '@storybook/react-vite';

import type { BucketCategoryType } from '@/features/bucket-create/types/bucket';

import BucketListItem from '../BucketListItem';

const meta: Meta<typeof BucketListItem> = {
  title: 'Components/BucketListItem',
  component: BucketListItem,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    date: { control: 'text' },
    category: {
      control: 'select',
      options: ['TRIP', 'HOBBY', 'FAMILY', 'HEALTH', ''],
    },
    completed: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof BucketListItem>;

export const Playground: Story = {
  args: {
    text: 'gg',
    date: '2024.09.10',
    category: 'TRIP' as BucketCategoryType,
    completed: false,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-4">
      <BucketListItem
        text="유럽여행 가기"
        date="2024.09.10"
        category="TRIP"
        completed={false}
      />
      <BucketListItem
        text="기타 배우기"
        date="2024.10.15"
        category="HOBBY"
        completed={true}
      />
      <BucketListItem
        text="부모님 여행 보내드리기"
        date="2024.12.01"
        category="FAMILY"
        completed={false}
      />
      <BucketListItem
        text="주 3회 운동하기"
        date="2025.01.01"
        category="HEALTH"
        completed={true}
      />
    </div>
  ),
};
