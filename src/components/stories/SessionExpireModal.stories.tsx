import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';

import { useSessionStore } from '@/stores/useSessionStore';

import SessionExpireModal from '../common/SessionExpireModal';

const meta: Meta<typeof SessionExpireModal> = {
  title: 'Components/SessionExpireModal',
  component: SessionExpireModal,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type PlaygroundArgs = {
  message: string;
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    message: '로그인이 필요한 서비스입니다.',
  },
  render: (args) => {
    const { openModal } = useSessionStore();

    useEffect(() => {
      openModal(args.message);
    }, [args.message, openModal]);

    return <SessionExpireModal />;
  },
};

export const Showcase = () => {
  const { openModal } = useSessionStore();

  useEffect(() => {
    openModal('인증이 만료되었습니다. 다시 로그인해주세요.');
  }, [openModal]);

  return <SessionExpireModal />;
};
