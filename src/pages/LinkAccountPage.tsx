import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import AccountConnect from '@/features/link-account/components/AccountConnect';
import AccountFetching from '@/features/link-account/components/AccountFetching';
import AccountSelect from '@/features/link-account/components/AccountSelect';
import TermOfUse from '@/features/link-account/components/TermOfUse';
import type { MainAccount } from '@/types/account';

import { useMainAccount } from '@/features/link-account/hooks/useMainAccount';
import { useLinkMainAccount } from '@/features/link-account/hooks/useLinkMainAccount';
import { showError, showSuccess } from '@/lib/toast';

const LinkAccountPage = () => {
  const navigate = useNavigate();
  const { data: account, isLoading, refetch } = useMainAccount();
  const { mutateAsync: linkMain } = useLinkMainAccount();
  const FETCHING_DELAY_MS = 5000;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => setStep(3), FETCHING_DELAY_MS);
    return () => clearTimeout(t);
  }, [step]);

  const handleLink = async () => {
    try {
      await linkMain();
      await refetch();
      showSuccess('계좌가 연결되었습니다.');
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('계좌 연결 실패:', error);
      showError('계좌 연결에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-y-auto px-6">
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
            <AccountConnect
              goToTermOfUse={() => setStep(1)}
              handleAgreeAll={() => setStep(2)}
            />
          )}

          {step === 1 && <TermOfUse onNext={() => setStep(2)} />}

          {step === 2 && <AccountFetching />}

          {step === 3 && (
            <AccountSelect
              account={account as MainAccount | undefined}
              isLoading={isLoading}
              onRetry={refetch}
              onConfirm={handleLink}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LinkAccountPage;
