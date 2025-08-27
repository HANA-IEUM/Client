import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AccountConnect from '@/features/link-account/AccountConnect';
import AccountFetching from '@/features/link-account/AccountFetching';
import AccountSelect from '@/features/link-account/AccountSelect';
import TermOfUse from '@/features/link-account/TermOfUse';

const LinkAccountPage = () => {
  const FETCHING_DELAY_MS = 5000;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => setStep(3), FETCHING_DELAY_MS);
    return () => clearTimeout(t); // 스텝 바뀌거나 언마운트 시 클리어
  }, [step]);

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

          {step === 3 && <AccountSelect />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LinkAccountPage;
