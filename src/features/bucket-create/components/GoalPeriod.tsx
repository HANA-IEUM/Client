// step 4-2: 목표 기간
import Button from '@/components/button/Button.tsx';
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
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <div>
          <p className="font-hana-regular mb-3 text-3xl">
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
        disabled={!period}
      />
    </div>
  );
};
