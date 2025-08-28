import React, { useRef, useState } from 'react';
import Button from '@/components/button/Button';
import BoxInput, { type BoxInputHandle } from '@/components/common/BoxInput';
import { toast } from 'react-hot-toast';
import type { Box } from '../types';

interface FillBoxPasswordProps {
  box: Box;
  amount: string;
  onBack: () => void;
  onConfirm: () => void;
}

const FillBoxPassword: React.FC<FillBoxPasswordProps> = ({
  box,
  amount,
  onBack,
  onConfirm,
}) => {
  const boxInputRef = useRef<BoxInputHandle>(null);
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onConfirm();
    toast.success('박스에 금액을 채웠어요!');
  };

  const isPasswordComplete = password.length === 4;

  return (
    <>
      <p className="text-3xl font-hana-regular text-text-primary !mb-9 !mt-3">
        계좌 <span className="font-hana-bold">비밀번호</span>를<br /> 입력해
        주세요
      </p>

      <div className="mb-114">
        <BoxInput
          ref={boxInputRef}
          length={4}
          isPassword
          align="center"
          focusColorClass="focus:border-theme-primary"
          onComplete={handleSubmit}
          onChange={(pin) => setPassword(pin)}
        />
      </div>

      <div className="mt-auto flex gap-3">
        <Button
          intent="silver"
          size="lg"
          label="뒤로"
          onClick={onBack}
          className="flex-1"
        />
        <Button
          intent={isPasswordComplete ? 'green' : 'silver'}
          size="lg"
          label="채우기"
          onClick={handleSubmit}
          className="flex-1"
          disabled={!isPasswordComplete}
        />
      </div>
    </>
  );
};

export default FillBoxPassword;
