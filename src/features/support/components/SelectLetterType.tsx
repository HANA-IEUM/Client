import { useState } from 'react';
import Button from '@/components/button/Button';
import LetterTypeSlider from './LetterTypeSlider';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper';

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
    <div className="relative h-full flex flex-col items-center w-full px-6 pb-5">
      <Header onClick={onBack} />
      <div className="mt-5 w-full">
        <Stepper totalSteps={2} currentStep={1} />
      </div>

      <div className="font-hana-regular text-3xl w-full mb-24">
        <p>
          <br />
          <span className="font-hana-bold">편지지</span>를 골라주세요
        </p>
      </div>

      <LetterTypeSlider value={selectedColor} onChange={setSelectedColor} />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
