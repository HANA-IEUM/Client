import { useState } from 'react';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import SupportBottomSheet from './SupportBottomSheet';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper';

type WriteTextAndSupportProps = {
  onBack: () => void;
  handleChangeLetterText: (text: string) => void;
  handleChangeSupportType: (type: string) => void;
  handleChangeSupportAmount: (amount: number) => void;
  onSubmit: (payload: { amount: number | null; pin: string | null }) => void;
};

const WriteTextAndSupport = ({
  onBack,
  onSubmit,
  handleChangeLetterText,
}: WriteTextAndSupportProps) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const isEmpty = text.trim().length === 0;

  const handleNextClick = () => {
    if (isEmpty) return;
    handleChangeLetterText(text);
    setOpen(true);
  };

  // const handleSupportSubmit = ({
  //   amount,
  //   pin,
  // }: {
  //   amount: number | null;
  //   pin: string | null;
  // }) => {
  //   if (amount === null && pin === null) {
  //     console.log('응원 요청', { message: text });
  //   } else {
  //     console.log('후원 요청', { message: text, amount, pin });
  //   }
  // };

  return (
    <div className="relative h-full flex flex-col items-center w-full px-6 pb-5">
      <Header onClick={onBack} />
      <div className="mt-5 w-full">
        <Stepper totalSteps={2} currentStep={2} />
      </div>
      <div className="font-hana-regular text-3xl w-full mb-6">
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
        bucketTitle="유럽 여행 가기"
        onSubmit={onSubmit}
      />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
