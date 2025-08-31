import { useEffect, useRef, useState } from 'react';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import Button from '@/components/button/Button.tsx';
import birthdayIcon from '@/assets/common/user/birthday.png';

export type BirthdayInputProps = {
  birthday: string;
  onBirthdayChange: (birthday: string) => void;
  onNext: () => void;
};

export const BirthdayInput = ({
  birthday,
  onBirthdayChange,
  onNext,
}: BirthdayInputProps) => {
  const yearInputRef = useRef<BoxInputHandle>(null);
  const monthInputRef = useRef<BoxInputHandle>(null);
  const dayInputRef = useRef<BoxInputHandle>(null);
  const [year, setYear] = useState(() => birthday?.split('-')[0] || '');
  const [month, setMonth] = useState(() => birthday?.split('-')[1] || '');
  const [day, setDay] = useState(() => birthday?.split('-')[2] || '');

  useEffect(() => {
    yearInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (year.length === 4 && month.length === 2 && day.length === 2) {
      onBirthdayChange(`${year}-${month}-${day}`);
    } else {
      onBirthdayChange('');
    }
  }, [year, month, day, onBirthdayChange]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={birthdayIcon} alt="birthday" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-left">
          <span className="font-hana-bold">생년월일</span>을 입력해 주세요
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BoxInput
              ref={yearInputRef}
              length={4}
              onChange={setYear}
              onComplete={() => monthInputRef.current?.focus()}
              value={year}
              align="start"
            />
            <span className="text-3xl font-hana-regular">년</span>
          </div>
          <div className="flex items-center gap-2">
            <BoxInput
              ref={monthInputRef}
              length={2}
              onChange={setMonth}
              onComplete={() => dayInputRef.current?.focus()}
              value={month}
              align="start"
            />
            <span className="text-3xl font-hana-regular">월</span>
          </div>
          <div className="flex items-center gap-2">
            <BoxInput
              ref={dayInputRef}
              length={2}
              onChange={setDay}
              value={day}
              align="start"
            />
            <span className="text-3xl font-hana-regular">일</span>
          </div>
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={birthday.length !== 10}
      />
    </div>
  );
};
