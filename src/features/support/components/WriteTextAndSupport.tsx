import { useState } from 'react';

import Button from '@/components/button/Button';
import Stepper from '@/components/common/Stepper';
import Header from '@/components/Header';
import Input from '@/components/input/Input';

import SupportBottomSheet from './SupportBottomSheet';

type WriteTextAndSupportProps = {
  onBack: () => void;
  handleChangeLetterText: (text: string) => void;
  handleChangeSupportType: (type: string) => void;
  handleChangeSupportAmount: (amount: number) => void;
  onSubmit: (payload: { amount: number | null; pin: string | null }) => void;
  title: string;
};

const WriteTextAndSupport = ({
  onBack,
  onSubmit,
  handleChangeLetterText,
  title,
}: WriteTextAndSupportProps) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const isEmpty = text.trim().length === 0;

  const handleNextClick = () => {
    if (isEmpty) return;
    handleChangeLetterText(text);
    setOpen(true);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pb-5">
      <Header onClick={onBack} />
      <div className="mt-5 w-full">
        <Stepper totalSteps={2} currentStep={2} />
      </div>
      <div className="font-hana-regular mb-6 w-full text-3xl">
        <p>
          <br />
          <span className="font-hana-bold">응원의 멘트</span>를 적어주세요
        </p>
      </div>

      <div className="w-full">
        <Input
          placeholder="엄마의 버킷리스트를 응원해요."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !isEmpty) setOpen(true);
          }}
        />
      </div>

      <SupportBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        messageText={text}
        bucketTitle={title}
        onSubmit={onSubmit}
      />

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <Button
          intent={isEmpty ? 'gray' : 'green'}
          label="확인"
          size="full"
          disabled={isEmpty}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default WriteTextAndSupport;
