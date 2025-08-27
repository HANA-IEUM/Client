import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import BucketEditBasicInfo from '@/features/bucket-edit/components/BucketEditBasicInfo';
import BucketEditFamily from '@/features/bucket-edit/components/BucketEditFamily';
import BucketEditGoal from '@/features/bucket-edit/components/BucketEditGoal';
import BucketEditSummary from '@/features/bucket-edit/components/BucketEditSummary';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper';

const BucketEditPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [editInfo, setEditInfo] = useState({
    withWho: '혼자',
    family: ['손혜정', '원윤서'],
    what: '유럽여행 가기',
    isprivate: false,
    targetAmount: 4000000,
    targetPeriod: '2026-04-03',
  });

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden px-6">
      {step != 3 && <Header onClick={() => setStep(step - 1)} />}
      <div className="mt-5">
        {step != 3 && <Stepper totalSteps={3} currentStep={step + 1} />}
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
          {step === 0 && (
            <BucketEditBasicInfo onNext={() => setStep(step + 1)} />
          )}

          {step === 1 && <BucketEditFamily onNext={() => setStep(step + 1)} />}

          {step === 2 && <BucketEditGoal onNext={() => setStep(step + 1)} />}

          {step === 3 && <BucketEditSummary />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BucketEditPage;
