import { useEffect, useRef, useState } from 'react';

import billPng from '@/assets/support/bill.png';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import BoxInput from '@/components/common/BoxInput';
import type { BoxInputHandle } from '@/components/common/BoxInput';
import Input from '@/components/input/Input';

type Step = 'confirm' | 'amount' | 'pin';

export interface SupportBottomSheetProps {
  open: boolean;
  onClose: () => void;
  messageText: string;
  bucketTitle?: string;
  onSubmit: (payload: { amount: number | null; pin: string | null }) => void;
}

const SupportBottomSheet = ({
  open,
  onClose,
  messageText,
  bucketTitle = '유럽 여행 가기',
  onSubmit,
}: SupportBottomSheetProps) => {
  const [step, setStep] = useState<Step>('confirm');

  // 금액
  const [amount, setAmount] = useState('');
  const rawAmount = amount.replaceAll(',', '');
  const isAmountValid = /^\d+$/.test(rawAmount) && Number(rawAmount) > 0;

  // PIN
  const [pin, setPin] = useState('');
  const isPinValid = pin.length === 4;
  const pinBoxRef = useRef<BoxInputHandle>(null);

  useEffect(() => {
    if (!open) {
      setStep('confirm');
      setAmount('');
      setPin('');
    }
  }, [open]);

  useEffect(() => {
    if (step === 'pin') pinBoxRef.current?.focus();
  }, [step]);

  const handleAmountChange = (v: string) => {
    const onlyDigits = v.replace(/[^\d]/g, '');
    if (!onlyDigits) return setAmount('');
    setAmount(Number(onlyDigits).toLocaleString('ko-KR'));
  };

  return (
    <BottomSheet isOpen={open} onClose={onClose} maxHeight="90vh">
      {step === 'confirm' && (
        <div className="flex min-h-[675px] flex-col gap-4">
          <div className="font-hana-regular mb-6 w-full text-3xl">
            <p>
              <span className="font-hana-bold">{bucketTitle}</span> 버킷을
              <br />
              응원하는 <span className="font-hana-bold">후원</span>
              &nbsp;하시겠어요?
            </p>
          </div>

          <div className="my-20 flex w-full items-center justify-center">
            <img src={billPng} width={180} height={180} />
          </div>

          <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
            <div className="flex w-full gap-3">
              <Button
                intent="gray"
                label="아니요"
                onClick={() => {
                  onSubmit({ amount: null, pin: null });
                  onClose();
                }}
                className="w-1/3"
              />
              <Button
                intent="green"
                label="후원하기"
                onClick={() => setStep('amount')}
                className="w-2/3"
              />
            </div>
          </div>
        </div>
      )}

      {step === 'amount' && (
        <div className="flex min-h-[675px] flex-col gap-4">
          <div className="font-hana-regular mb-6 w-full text-3xl">
            <p>
              <span className="font-hana-bold">금액</span>을 입력해 주세요
            </p>
          </div>

          <div className="flex w-full items-center gap-2">
            <div></div>
            <Input
              placeholder="응원하는 마음을 꾹꾹 담아"
              inputMode="numeric"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleAmountChange(e.target.value)
              }
              className="flex-1"
            />
            <span className="font-hana-bold text-2xl">원</span>
          </div>

          <div className="px-3">
            <p className="font-hana-regular text-lg">
              💡 가족 간 일정 금액 이상의 후원은
              <br />
              「상속세 및 증여세법」 에 따라 증여세 <br />
              과세 대상이 될 수 있습니다
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
            <div className="flex w-full gap-3">
              <Button
                intent="gray"
                label="뒤로"
                onClick={() => setStep('confirm')}
                className="w-1/3"
              />
              <Button
                intent={isAmountValid ? 'green' : 'gray'}
                disabled={!isAmountValid}
                label="확인"
                onClick={() => setStep('pin')}
                className="w-2/3"
              />
            </div>
          </div>
        </div>
      )}

      {step === 'pin' && (
        <div className="flex min-h-[675px] flex-col gap-4">
          <div className="font-hana-regular mb-6 w-full text-3xl">
            <p>
              계좌 <span className="font-hana-bold">비밀번호</span>를
              <br />
              입력해 주세요
            </p>
          </div>

          <BoxInput
            ref={pinBoxRef}
            length={4}
            value={pin}
            onChange={(v) => setPin(v)}
            onComplete={(v) => setPin(v)}
            isPassword
            align="start"
          />

          <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
            <div className="flex w-full gap-3">
              <Button
                intent="gray"
                label="뒤로"
                onClick={() => setStep('amount')}
                className="w-1/3"
              />
              <Button
                intent={isPinValid ? 'green' : 'gray'}
                disabled={!isPinValid}
                label="후원하기"
                onClick={() => {
                  onSubmit({ amount: Number(rawAmount), pin });
                  onClose();
                }}
                className="w-2/3"
              />
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};

export default SupportBottomSheet;
