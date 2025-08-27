import React, { useRef } from 'react';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import BoxInput, { type BoxInputHandle } from '@/components/common/BoxInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import type { Box } from '../types';

interface FillBoxPasswordProps {
  box: Box;
  amount: string;
  isOpen: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

const FillBoxPassword: React.FC<FillBoxPasswordProps> = ({
  box,
  amount,
  isOpen,
  onBack,
  onConfirm,
}) => {
  const boxInputRef = useRef<BoxInputHandle>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    onConfirm();
    toast.success('박스에 금액을 채웠어요!');
    navigate('/wallet');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onBack}>
      <p className="text-3xl font-hana-regular text-text-primary !mb-9 !mt-3">
        계좌 <span className="font-hana-bold">비밀번호</span>를<br /> 입력해
        주세요
      </p>

      <div className="mb-8 mb-114">
        <BoxInput
          ref={boxInputRef}
          length={4}
          isPassword
          align="center"
          focusColorClass="focus:border-theme-primary"
          onComplete={handleSubmit}
        />
      </div>

      <div className="flex gap-3">
        <Button
          intent="silver"
          size="lg"
          label="뒤로"
          onClick={onBack}
          className="flex-1"
        />
        <Button
          intent="green"
          size="lg"
          label="채우기"
          onClick={handleSubmit}
          className="flex-1"
        />
      </div>
    </BottomSheet>
  );
};

export default FillBoxPassword;
