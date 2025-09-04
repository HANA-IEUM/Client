import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import BottomSheet from '../common/BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    maxHeight: { control: 'text' },
    onClose: { action: 'closed' },
  },
};
export default meta;

type Story = StoryObj<typeof BottomSheet>;

/* ✅ Playground: Controls에서 열림/닫힘 직접 조절 */
export const Playground: Story = {
  args: {
    isOpen: true,
    maxHeight: '90vh',
    children: (
      <div className="text-center text-lg">여기에 콘텐츠가 들어갑니다</div>
    ),
  },
};

/* ✅ Showcase: 버튼으로 열고 닫는 데모 */
export const Showcase = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setOpen(true)}
        >
          바텀시트 열기
        </button>

        <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
          <h2 className="mb-2 text-xl font-bold">BottomSheet Demo</h2>
          <p className="mb-4 text-gray-600">
            버튼을 눌러 닫을 수도 있고, 바깥 영역을 클릭해도 닫힙니다.
          </p>
          <button
            className="w-full rounded bg-red-500 px-4 py-2 text-white"
            onClick={() => setOpen(false)}
          >
            닫기
          </button>
        </BottomSheet>
      </div>
    );
  },
};
