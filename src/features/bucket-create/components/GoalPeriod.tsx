// step 4-2: 목표 기간
import { useState } from 'react';

import questionIcon from '@/assets/bucket-detail/question.png';
import Button from '@/components/button/Button.tsx';
import BottomSheet from '@/components/common/BottomSheet.tsx';
import SelectItem from '@/components/SelectItem.tsx';
import type { GoalPeriodProps } from '@/features/bucket-create/types/props.ts';

export const GoalPeriod = ({
  period,
  setPeriod,
  handleAmount,
  onNext,
}: GoalPeriodProps) => {
  const handleNext = () => {
    handleAmount();
    onNext();
  };
  const periods = [3, 6, 12, 24];
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <div>
          <p className="font-hana-regular !mb-0 text-3xl">
            <span className="font-hana-bold">목표 기간</span>을 선택해 주세요
          </p>
          <div className="mt-4 mb-8 flex" onClick={() => setVisible(true)}>
            <img className="mr-2 h-7 w-7" src={questionIcon} alt={'?'} />
            <div className="font-hana-regular text-text-secondary text-lg font-normal underline">
              머니박스 금리 안내
            </div>
          </div>
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
        size="full"
        intent="green"
        onClick={handleNext}
        disabled={!period}
      />
      <BottomSheet isOpen={visible} onClose={() => setVisible(false)}>
        <div className="mt-6 flex flex-col gap-4">
          <p className="font-hana-regular text-text-primary text-3xl">
            <span className="font-hana-bold">머니박스 금리 안내</span>
          </p>
          <div className="border-line-light bg-btn-default-bg rounded-lg border p-4 text-lg">
            <div className="border-line font-hana-medium text-text-primary flex justify-between border-b pb-2">
              <span>기간</span>
              <span>금리</span>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { period: '3개월', rate: '1.0% ~ 2.0%' },
                { period: '6개월', rate: '1.5% ~ 2.5%' },
                { period: '12개월', rate: '2.5% ~ 3.5%' },
                { period: '24개월', rate: '3.2% ~ 4.2%' },
              ].map(({ period, rate }) => {
                const [lower, upper] = rate.split(' ~ ');
                return (
                  <div
                    key={period}
                    className="font-hana-regular text-text-primary flex items-baseline justify-between"
                  >
                    <span>{period}</span>
                    <span className="text-theme-primary">
                      {lower} ~{' '}
                      <span className="font-hana-bold text-lg">{upper}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="font-hana-regular text-text-primary text-lg">
            ❗<span className="font-hana-bold">하나은행 연금 수령 계좌</span>를
            등록한 경우,
            <br />
            우대금리 <span className="font-hana-bold">1%</span>가 추가돼요️
          </p>
          <Button
            label="확 인"
            size="full"
            intent="green"
            onClick={() => setVisible(false)}
          />
        </div>
      </BottomSheet>
    </div>
  );
};
