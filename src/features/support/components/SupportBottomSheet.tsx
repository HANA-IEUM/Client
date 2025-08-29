import { useEffect, useRef, useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import billPng from '@/assets/support/bill.png';
import BoxInput from '@/components/common/BoxInput';
import type { BoxInputHandle } from '@/components/common/BoxInput';

type Step = 'confirm' | 'amount' | 'pin';

export interface SupportBottomSheetProps {
  open: boolean;
  onClose: () => void;
  messageText: string;
  bucketTitle?: string;
  onSubmit: (payload: { amount: number; pin: string }) => void;
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
        <div className="flex flex-col gap-4 min-h-[675px]">
          <div className="font-hana-regular text-3xl w-full mb-6">
            <p>
              <span className="font-hana-bold">{bucketTitle}</span> 버킷을
              <br />
              응원하는 <span className="font-hana-bold">후원</span>
              &nbsp;하시겠어요?
            </p>
          </div>

          <div className="w-full flex justify-center items-center my-20">
            <img src={billPng} width={180} height={180} />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
            <div className="w-full flex gap-3">
              <Button
                intent="gray"
                label="아니요"
                onClick={onClose}
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
        <div className="flex flex-col gap-4 min-h-[675px]">
          <div className="font-hana-regular text-3xl w-full mb-6">
            <p>
              <span className="font-hana-bold">금액</span>을 입력해 주세요
            </p>
          </div>

          <div className="w-full flex items-center gap-2">
            <Input
              placeholder="4,000,000"
              inputMode="numeric"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleAmountChange(e.target.value)
              }
              className="flex-1"
            />
            <span className="text-xl font-hana-bold">원</span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
            <div className="w-full flex gap-3">
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
        <div className="flex flex-col gap-4 min-h-[675px]">
          <div className="font-hana-regular text-3xl w-full mb-6">
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

          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
            <div className="w-full flex gap-3">
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
