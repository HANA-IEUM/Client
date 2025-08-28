import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FamilyGroupEmptyStateCard from '@/features/group-join/components/FamilyGroupEmptyStateCard';
import GroupNameForm from '@/features/group-join/components/GroupNameForm';
import InviteCodeForm from '@/features/group-join/components/InviteCodeForm';
import InviteCodeSharePanel from '@/features/group-join/components/InviteCodeSharePanel';

import { useCreateGroup } from '@/features/group-join/hooks/useCreateGroup';
import { useJoinGroup } from '@/features/group-join/hooks/useJoinGroup';
import { showSuccess, showError } from '@/lib/toast';

const GroupJoinPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState<string>('');

  const createGroup = useCreateGroup();
  const joinGroup = useJoinGroup();

  const handleCreateGroup = useCallback(
    async (groupName: string) => {
      try {
        const group = await createGroup.mutateAsync(groupName);
        setInviteCode(group.inviteCode);
        setStep(3);
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? '그룹 생성에 실패했어요. 다시 시도해 주세요.';
        showError(msg);
      }
    },
    [createGroup]
  );

  const handleJoin = useCallback(
    (code: string) => {
      if (joinGroup.isPending) return;
      joinGroup.mutate(code, {
        onSuccess: () => {
          showSuccess('그룹에 참여했어요!');
          navigate('/home', { replace: true });
        },
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ??
            '참여에 실패했습니다. 초대코드를 확인해 주세요.';
          showError(msg);
        },
      });
    },
    [joinGroup, navigate]
  );

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden px-6">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          {step === 0 && (
            <FamilyGroupEmptyStateCard
              onInviteClick={() => setStep(1)}
              onCreateClick={() => setStep(2)}
            />
          )}

          {step === 1 && (
            <InviteCodeForm
              onBack={() => setStep(0)}
              onJoin={handleJoin}
              loading={joinGroup.isPending}
            />
          )}

          {step === 2 && (
            <GroupNameForm
              onBack={() => setStep(0)}
              onSubmit={handleCreateGroup}
              loading={createGroup.isPending}
            />
          )}

          {step === 3 && (
            <InviteCodeSharePanel
              code={inviteCode}
              onBack={() => setStep(2)}
              onConfirm={() => navigate('/home')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroupJoinPage;
