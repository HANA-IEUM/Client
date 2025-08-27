import { useState } from 'react';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import BoxInput from '@/components/common/BoxInput';

type BucketEditGoalProps = {
  onNext: () => void;
};

const BucketEditGoal = ({ onNext }: BucketEditGoalProps) => {
  const [amount, setAmount] = useState<string>(''); // 표시할 문자열

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
  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6 pb-5">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <br />
          버킷리스트를 이루기 위한
          <br />
          <span className="font-hana-bold">목표금액</span>을 입력해 주세요
        </p>
      </div>

      <div className="flex gap-3">
        <Input placeholder="4,000,000" value={amount} onChange={handleChange} />
        <span className="font-hana-bold text-text-secondary text-4xl">원</span>
      </div>

      <div className="w-full mt-28">
        <p className="font-hana-regular text-3xl">
          <span className="font-hana-bold">목표기간</span>을 입력해 주세요
        </p>
        <div className="flex flex-col gap-7 w-full justify-items-start">
          <div className="flex gap-3 items-center">
            <BoxInput length={4} align="start" />
            <span className="font-hana-bold text-4xl text-text-secondary">
              년
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <BoxInput length={2} align="start" />
            <span className="font-hana-bold text-4xl text-text-secondary">
              월
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <BoxInput length={2} align="start" />
            <span className="font-hana-bold text-4xl text-text-secondary">
              일
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          onClick={onNext}
          intent="green"
          label="확인"
          size="full"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BucketEditGoal;
