import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect } from 'react';
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
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState('');

  // URL 쿼리 파라미터에서 step 값 처리
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepNumber = parseInt(stepParam, 10);
      if (stepNumber >= 0 && stepNumber <= 3) {
        setStep(stepNumber);
      }
    }
  }, [searchParams]);

  // step이 변경될 때마다 URL 업데이트
  useEffect(() => {
    if (step > 0) {
      navigate(`/group?step=${step}`, { replace: true, state: location.state });
    }
  }, [step, navigate, location.state]);

  // 뒤로가기 처리
  const handleBack = () => {
    console.log('handleBack called, step:', step);
    if (step === 0) {
      // 첫 번째 단계에서는 가족 탭으로 이동
      const fromPath = location.state?.from || '/family';
      navigate(fromPath);
    } else if (step === 1 || step === 2) {
      // 그룹 참여(step=1) 또는 그룹 생성(step=2)에서 뒤로가기
      if (location.state?.from) {
        // 가족 탭에서 온 경우에만 가족 탭으로 이동
        const fromPath = location.state.from;
        navigate(fromPath);
      } else {
        // 직접 URL로 접근한 경우 /group으로 이동하고 step을 0으로 리셋
        setStep(0);
        navigate('/group');
      }
    } else {
      // 다른 단계에서는 이전 단계로 이동
      setStep(step - 1);
    }
  };

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
        navigate(destination, { replace: true });
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

        // 가족 탭에서 온 경우 가족 탭으로 돌아가기
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        } else {
          // 직접 접근한 경우 기본 목적지로 이동
          navigate(destination, { replace: true });
        }
      } catch (err) {
        showError(
          getErrMsg(err, '참여에 실패했습니다. 초대코드를 확인해 주세요.')
        );
      }
    },
    [joining, joinGroupAsync, navigate, destination, location.state]
  );

  const handleConfirm = useCallback(() => {
    // 가족 탭에서 온 경우 가족 탭으로 돌아가기
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      // 직접 접근한 경우 기본 목적지로 이동
      navigate(destination, { replace: true });
    }
  }, [navigate, destination, location.state]);

  const handleLater = () => {
    navigate(destination, { replace: true });
  };

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
              onDoLater={handleLater}
            />
          )}

          {step === 1 && (
            <InviteCodeForm
              onBack={handleBack}
              onJoin={handleJoin}
              loading={joining}
            />
          )}

          {step === 2 && (
            <GroupNameForm
              onBack={handleBack}
              onSubmit={handleCreateGroup}
              loading={creating}
            />
          )}

          {step === 3 && (
            <InviteCodeSharePanel
              code={inviteCode}
              onBack={handleBack}
              onConfirm={handleConfirm}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroupJoinPage;
