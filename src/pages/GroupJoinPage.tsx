import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FamilyGroupEmptyStateCard from '@/features/group-join/components/FamilyGroupEmptyStateCard';
import GroupNameForm from '@/features/group-join/components/GroupNameForm';
import InviteCodeForm from '@/features/group-join/components/InviteCodeForm';
import InviteCodeSharePanel from '@/features/group-join/components/InviteCodeSharePanel';

import { useCreateGroup } from '@/features/group-join/hooks/useCreateGroup';
import { useJoinGroup } from '@/features/group-join/hooks/useJoinGroup';
import { useHideGroupPrompt } from '@/features/auth/hooks/useHideGroupPrompt';
import { useMainAccountLinked } from '@/features/link-account/hooks/useMainAccountLinked';
import { showSuccess, showError } from '@/lib/toast';

const getErrMsg = (err: unknown, fallback: string) =>
  (err as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ?? fallback;

const GroupJoinPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState('');

  // 훅들 구조분해
  const { mutateAsync: createGroupAsync, isPending: creating } =
    useCreateGroup();
  const { mutateAsync: joinGroupAsync, isPending: joining } = useJoinGroup();
  const { mutate: hidePrompt } = useHideGroupPrompt();
  const { isLinked } = useMainAccountLinked();

  // 목적지 경로 메모
  const destination = useMemo(
    () => (isLinked ? '/home' : '/account'),
    [isLinked]
  );

  const handleCreateGroup = useCallback(
    async (groupName: string) => {
      try {
        const group = await createGroupAsync(groupName);
        setInviteCode(group.inviteCode);
        setStep(3);
      } catch (err) {
        showError(
          getErrMsg(err, '그룹 생성에 실패했어요. 다시 시도해 주세요.')
        );
      }
    },
    [createGroupAsync]
  );

  const handleHide = useCallback(() => {
    hidePrompt(undefined, {
      onSuccess: () => {
        showSuccess('그룹 안내를 숨겼어요.');
        navigate('/home', { replace: true });
      },
      onError: () =>
        showError('설정에 실패했어요. 잠시 후 다시 시도해 주세요.'),
    });
  }, [hidePrompt, navigate]);

  const handleJoin = useCallback(
    async (code: string) => {
      if (joining) return;
      try {
        await joinGroupAsync(code);
        showSuccess('그룹에 참여했어요!');
        navigate(destination, { replace: true });
      } catch (err) {
        showError(
          getErrMsg(err, '참여에 실패했습니다. 초대코드를 확인해 주세요.')
        );
      }
    },
    [joining, joinGroupAsync, navigate, destination]
  );

  const handleConfirm = useCallback(() => {
    navigate(destination, { replace: true });
  }, [navigate, destination]);

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
              onHide={handleHide}
            />
          )}

          {step === 1 && (
            <InviteCodeForm
              onBack={() => setStep(0)}
              onJoin={handleJoin}
              loading={joining}
            />
          )}

          {step === 2 && (
            <GroupNameForm
              onBack={() => setStep(0)}
              onSubmit={handleCreateGroup}
              loading={creating}
            />
          )}

          {step === 3 && (
            <InviteCodeSharePanel
              code={inviteCode}
              onBack={() => setStep(2)}
              onConfirm={handleConfirm}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroupJoinPage;
