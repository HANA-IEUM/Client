import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SelectLetterType from '@/features/support/components/SelectLetterType';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper';
import WriteText from '@/features/support/components/WriteTextAndSupport';

const SupportPage = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden px-6">
      <Header onClick={() => setStep(step - 1)} />
      <div className="mt-5">
        <Stepper totalSteps={2} currentStep={step + 1} />
      </div>

      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          {step === 0 && <SelectLetterType onNext={() => setStep(step + 1)} />}

          {step === 1 && <WriteText />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SupportPage;
