import React, { useEffect, useRef } from 'react';
import type { InputRef } from 'antd';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import coinIcon from '@/assets/common/user/coin.png';

export type MonthlyCostInputProps = {
  cost: string;
  onCostChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

export const MonthlyCostInput = ({
  cost,
  onCostChange,
  onNext,
}: MonthlyCostInputProps) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={coinIcon} alt="wallet" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-left">
          <span className="font-hana-bold">월 생활비</span>를 입력해 주세요
        </p>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            intent="green"
            placeholder="500000"
            value={cost}
            onChange={onCostChange}
          />
          <span className="text-3xl font-hana-regular">원</span>
        </div>
      </div>
      <div className="mb-4">
        <p>
          은퇴 후 자금 설계 이전이라면, <br />
          아래 버튼을 클릭해 진단을 먼저 받아주세요
        </p>
        <Button
          label="자금 설계 →"
          size="full-lg"
          intent="mint"
          font="regular"
          onClick={() =>
            window.open(
              'https://pension.kebhana.com/rpc/hhom/kr/rpc02060201.do',
              '_blank'
            )
          }
        />
      </div>
      <Button
        label="완료"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={!cost}
      />
    </div>
  );
};
