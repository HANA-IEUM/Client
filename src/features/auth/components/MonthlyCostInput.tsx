import type { InputRef } from 'antd';
import React, { useEffect, useRef } from 'react';

import coinIcon from '@/assets/common/user/coin.png';
import Button from '@/components/button/Button.tsx';
import Input from '@/components/input/Input.tsx';

export type MonthlyCostInputProps = {
  cost: string;
  setCost: (str: string) => void;
  onNext: () => void;
};

export const MonthlyCostInput = ({
  cost,
  setCost,
  onNext,
}: MonthlyCostInputProps) => {
  const inputRef = useRef<InputRef>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setCost('');
      return;
    }
    // 숫자로 변환 후 locale string 적용
    const formatted = Number(rawValue).toLocaleString();
    setCost(formatted);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6">
        <div className="bg-theme-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <img src={coinIcon} alt="wallet" className="h-10 w-10" />
        </div>
        <p className="font-hana-regular text-left text-3xl">
          <span className="font-hana-bold">월 생활비</span>를 입력해 주세요
        </p>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            intent="green"
            placeholder="500000"
            value={cost}
            onChange={handleChange}
          />
          <span className="font-hana-regular text-3xl">원</span>
        </div>
      </div>
      <div className="font-hana-regular mb-4">
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
