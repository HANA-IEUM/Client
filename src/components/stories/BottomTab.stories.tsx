import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import BottomTab from '../BottomTab';

interface BottomTabStoryProps {
  initialPath?: string;
}

const meta: Meta<typeof BottomTab & BottomTabStoryProps> = {
  title: 'Components/BottomTab',
  component: BottomTab,
  tags: ['autodocs'],
  argTypes: {
    initialPath: {
      control: 'select',
      options: ['/home', '/family', '/wallet', '/album', '/mypage'],
      description: '현재 활성화될 탭 경로',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    initialPath: '/home',
  },
  decorators: [
    (Story, context) => {
      const initialPath =
        (context.args as BottomTabStoryProps).initialPath || '/home';
      return (
        <MemoryRouter key={initialPath} initialEntries={[initialPath]}>
          <div className="w-full max-w-sm border">
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
};
