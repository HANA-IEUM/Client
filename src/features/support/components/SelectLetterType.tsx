import { useState } from 'react';

import Button from '@/components/button/Button';
import Stepper from '@/components/common/Stepper';
import Header from '@/components/Header';

import LetterTypeSlider from './LetterTypeSlider';

type SelectLetterTypeProps = {
  onNext: () => void;
  onBack: () => void;
  handleChangeLetterColor: (color: string) => void;
};

const SelectLetterType = ({
  onNext,
  onBack,
  handleChangeLetterColor,
}: SelectLetterTypeProps) => {
  const [selectedColor, setSelectedColor] = useState<'PINK' | 'GREEN' | 'BLUE'>(
    'PINK'
  );

  const handleNextClick = () => {
    handleChangeLetterColor(selectedColor);
    onNext();
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pb-5">
      <Header onClick={onBack} />
      <div className="mt-5 w-full">
        <Stepper totalSteps={2} currentStep={1} />
      </div>

      <div className="font-hana-regular mb-24 w-full text-3xl">
        <p>
          <br />
          <span className="font-hana-bold">편지지</span>를 골라주세요
        </p>
      </div>

      <LetterTypeSlider value={selectedColor} onChange={setSelectedColor} />

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <Button
          intent="green"
          label="확인"
          size="full"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default SelectLetterType;
