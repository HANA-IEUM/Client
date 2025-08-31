// Step 4: 목표 금액, 기간
import React, { useEffect, useRef } from 'react';
import { type InputRef } from 'antd';
import Input from '@/components/input/Input.tsx';
import SelectItem from '@/components/SelectItem.tsx';
import Button from '@/components/button/Button.tsx';
import type { GoalAmountPeriodProps } from '@/features/bucket-create/types/props.ts';

export const GoalAmountPeriod = ({
  amount,
  setAmount,
  period,
  setPeriod,
  handleAmount,
  onNext,
}: GoalAmountPeriodProps) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setAmount('');
      return;
    }
    // 숫자로 변환 후 locale string 적용
    const formatted = Number(rawValue).toLocaleString();
    setAmount(formatted);
  };
  const handleNext = () => {
    handleAmount();
    onNext();
  };

  const periods = [3, 6, 12, 24];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <div>
          <p className="font-hana-regular text-3xl mb-3">
            버킷리스트를 이루기 위한
            <br />
            <span className="font-hana-bold">목표 금액</span>을 입력해 주세요
          </p>
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={amount}
              onChange={handleChange}
              placeholder="3,000,000"
              type="text"
              intent="green"
            />
            <span className="text-3xl font-hana-regular">원</span>
          </div>
        </div>
        <div>
          <p className="font-hana-regular text-3xl mb-3">
            <span className="font-hana-bold">목표 기간</span>을 선택해 주세요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {periods.map((p) => (
              <SelectItem
                key={p}
                text={`${p}개월`}
                selected={period === p}
                onClick={() => setPeriod(p)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={handleNext}
        disabled={!amount || !period}
      />
    </div>
  );
};
