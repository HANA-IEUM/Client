import React, { useState } from 'react';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import type { Box } from '@/features/wallet/types';

interface FillBoxAmountProps {
  box: Box;
  onBack: () => void;
  onConfirm: (amount: string) => void;
}

const FillBoxAmount: React.FC<FillBoxAmountProps> = ({
  box,
  onBack,
  onConfirm,
}) => {
  const [amount, setAmount] = useState('');

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/,/g, '').replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(e.target.value));
  };

  const hasAmount = amount.replace(/,/g, '').length > 0;

  return (
    <>
      <p className="text-3xl font-hana-regular text-text-primary !mb-8 !mt-3">
        <span className="font-hana-bold">금액</span>을 입력해 주세요
      </p>

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              value={amount}
              onChange={handleAmountChange}
              placeholder="100,000"
              intent="green"
              font="regular"
              className="!text-2xl !px-4"
            />
          </div>
          <span className="text-4xl font-hana-medium text-text-secondary whitespace-nowrap">
            원
          </span>
        </div>
      </div>

      <div className="mt-114 flex gap-3">
        <Button
          intent="silver"
          size="lg"
          font="regular"
          className="flex-1"
          onClick={onBack}
        >
          뒤로
        </Button>
        <Button
          intent={hasAmount ? 'green' : 'silver'}
          size="lg"
          font="bold"
          className="flex-1"
          onClick={() => onConfirm(amount)}
          disabled={!hasAmount}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default FillBoxAmount;
