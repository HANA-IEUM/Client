import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import SelectLetterType from '@/features/support/components/SelectLetterType';
import WriteTextAndSupport from '@/features/support/components/WriteTextAndSupport';
import { useSupport } from '@/features/support/hooks/useSupports';
import { useGAEvent } from '@/hooks/useGAEvent';
import { showError, showSuccess } from '@/lib/toast';

type SupportInfo = {
  letterColor: string;
  message: string;
  supportType: string;
  supportAmount: number | null;
  accountPassword: number | null;
};

const SupportPage = () => {
  const navigate = useNavigate();
  const trackSupportEvent = useGAEvent('support');
  const [step, setStep] = useState(0);
  const {
    memberId: memberId,
    id: bucketId,
    title: title,
  } = useParams<{
    id: string;
    memberId: string;
    title: string;
  }>();
  const { mutate: support } = useSupport(Number(bucketId));
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
    trackSupportEvent('support_type_selected', type);
    setSupportInfo((prev) => ({ ...prev, supportType: type }));
  };

  const handleChangeSupportAmount = (amount: number) => {
    setSupportInfo((prev) => ({ ...prev, supportAmount: amount }));
  };

  const handleSupportSubmit = (payload: {
    amount: number | null;
    pin: string | null;
  }) => {
    // if (payload.amount === null && payload.pin === null) {
    //   console.log('응원 요청', { message: supportInfo.message });
    // } else {
    //   console.log('후원 요청', {
    //     message: supportInfo.message,
    //     amount: payload.amount,
    //     pin: payload.pin,
    //   });
    // }

    trackSupportEvent(
      'support_submit_attempt',
      payload.amount === null ? 'cheer' : 'sponsor'
    );

    support(
      {
        letterColor: supportInfo.letterColor,
        message: supportInfo.message,
        supportType: payload.amount === null ? 'CHEER' : 'SPONSOR',
        supportAmount: payload.amount,
        accountPassword: payload.pin,
      },
      {
        onSuccess: () => {
          trackSupportEvent(
            'support_submit_success',
            payload.amount === null ? 'cheer' : 'sponsor'
          );
          showSuccess('응원이 성공적으로 완료되었어요.');
          navigate(`/family/member/${memberId}/bucket/${bucketId}`);
        },
        onError: (error) => {
          trackSupportEvent(
            'support_submit_failed',
            payload.amount === null ? 'cheer' : 'sponsor'
          );
          showError('응원에 실패했어요. 다시 시도해 주세요.');
        },
      }
    );
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden px-6">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        >
          {step === 0 && (
            <SelectLetterType
              handleChangeLetterColor={handleChangeLetterColor}
              onNext={() => {
                trackSupportEvent(
                  'support_letter_selected',
                  supportInfo.letterColor
                );
                setStep(step + 1);
              }}
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
              title={title}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SupportPage;
