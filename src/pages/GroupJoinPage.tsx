import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FamilyGroupEmptyStateCard from '@/features/group-join/components/FamilyGroupEmptyStateCard';
import GroupNameForm from '@/features/group-join/components/GroupNameForm';
import InviteCodeForm from '@/features/group-join/components/InviteCodeForm';
import InviteCodeSharePanel from '@/features/group-join/components/InviteCodeSharePanel';

import { useCreateGroup } from '@/features/group-join/hooks/useCreateGroup';
import { useJoinGroup } from '@/features/group-join/hooks/useJoinGroup';
import { useHideGroupPrompt } from '@/features/auth/hooks/useHideGroupPrompt';
import { showSuccess, showError } from '@/lib/toast';

import { useQueryClient } from '@tanstack/react-query';
import { fetchMainAccount } from '@/features/link-account/apis/accountApi';
import { accountQK } from '@/features/link-account/hooks/useMainAccount';

const GroupJoinPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState<string>('');

  const qc = useQueryClient();

  const createGroup = useCreateGroup();
  const joinGroup = useJoinGroup();
  const hide = useHideGroupPrompt();

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

  const handleHide = useCallback(() => {
    hide.mutate(undefined, {
      onSuccess: () => {
        showSuccess('그룹 안내를 숨겼어요.');
        navigate('/home', { replace: true });
      },
      onError: () =>
        showError('설정에 실패했어요. 잠시 후 다시 시도해 주세요.'),
    });
  }, [hide]);

  const handleJoin = useCallback(
    async (code: string) => {
      if (joinGroup.isPending) return;

      try {
        await joinGroup.mutateAsync(code);
        showSuccess('그룹에 참여했어요!');

        const main = await qc.fetchQuery({
          queryKey: accountQK.main,
          queryFn: fetchMainAccount,
        });

        const linked =
          !!main &&
          (typeof main.mainAccountLinked === 'boolean'
            ? main.mainAccountLinked
            : true);

        navigate(linked ? '/home' : '/account', { replace: true });
      } catch (err) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? '참여에 실패했습니다. 초대코드를 확인해 주세요.';
        showError(msg);
      }
    },
    [joinGroup, qc, navigate]
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
              onHide={handleHide}
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
