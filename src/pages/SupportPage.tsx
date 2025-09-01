import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SelectLetterType from '@/features/support/components/SelectLetterType';
import { useNavigate } from 'react-router-dom';
import WriteTextAndSupport from '@/features/support/components/WriteTextAndSupport';
import { useParams } from 'react-router-dom';
import { useSupport } from '@/features/support/hooks/useSupports';

type SupportInfo = {
  letterColor: string;
  message: string;
  supportType: string;
  supportAmount: number | null;
  accountPassword: number | null;
};

const SupportPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { id: bucketId } = useParams<{ id: string }>();
  const { mutate: support, isPending } = useSupport(Number(bucketId));
  const [supportInfo, setSupportInfo] = useState<SupportInfo>({
    letterColor: 'PINK',
    message: '',
    supportType: 'CHEER',
    supportAmount: 0,
    accountPassword: null,
  });

  const handleChangeLetterColor = (color: string) => {
    setSupportInfo((prev) => ({ ...prev, letterColor: color }));
  };

  const handleChangeLetterText = (text: string) => {
    setSupportInfo((prev) => ({ ...prev, message: text }));
  };

  const handleChangeSupportType = (type: string) => {
    setSupportInfo((prev) => ({ ...prev, supportType: type }));
  };

  const handleChangeSupportAmount = (amount: number) => {
    setSupportInfo((prev) => ({ ...prev, supportAmount: amount }));
  };

  const handleSupportSubmit = (payload: {
    amount: number | null;
    pin: string | null;
  }) => {
    if (payload.amount === null && payload.pin === null) {
      console.log('응원 요청', { message: supportInfo.message });
    } else {
      console.log('후원 요청', {
        message: supportInfo.message,
        amount: payload.amount,
        pin: payload.pin,
      });
    }

    support({
      letterColor: supportInfo.letterColor,
      message: supportInfo.message,
      supportType: payload.amount === null ? 'CHEER' : 'SPONSOR',
      supportAmount: payload.amount,
      accountPassword: payload.pin,
    });
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
            <SelectLetterType
              handleChangeLetterColor={handleChangeLetterColor}
              onNext={() => setStep(step + 1)}
              onBack={() => navigate(-1)}
            />
          )}

          {step === 1 && (
            <WriteTextAndSupport
              onBack={() => setStep(step - 1)}
              handleChangeLetterText={handleChangeLetterText}
              handleChangeSupportType={handleChangeSupportType}
              handleChangeSupportAmount={handleChangeSupportAmount}
              onSubmit={handleSupportSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SupportPage;
