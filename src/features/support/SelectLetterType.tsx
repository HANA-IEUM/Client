import { useState } from 'react';
import Button from '@/components/button/Button';
import LetterTypeSlider from './LetterTypeSlider';

type SelectLetterTypeProps = {
  onNext: () => void;
};

const SelectLetterType = ({ onNext }: SelectLetterTypeProps) => {
  const [selectedColor, setSelectedColor] = useState<'pink' | 'green' | 'blue'>(
    'pink'
  );

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6 pb-5">
      <div className="font-hana-regular text-3xl w-full mb-24">
        <p>
          <br />
          <span className="font-hana-bold">편지지</span>를 골라주세요
        </p>
      </div>

      <LetterTypeSlider value={selectedColor} onChange={setSelectedColor} />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button intent="green" label="확인" size="full" onClick={onNext} />
      </div>
    </div>
  );
};

export default SelectLetterType;
