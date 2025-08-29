import { useState } from 'react';
import Button from '@/components/button/Button';
import SelectItem from '@/components/SelectItem';

type BucketEditFamilyProps = {
  onNext: () => void;
};

const BucketEditFamily = ({ onNext }: BucketEditFamilyProps) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const toggleName = (name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const familyNames = ['원윤서', '손혜정', '김대현', '김기보', '정재희'];

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6 pb-5">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <br />
          버킷리스트를 <span className="font-hana-bold">함께할 가족</span>을
          <br />
          모두 선택해 주세요
        </p>
      </div>

      <div className="w-full scrollbar-hide overflow-y-auto min-h-0 pr-1 mb-5 pb-24">
        <div className="grid grid-cols-2 gap-3 mt-6">
          {familyNames.map((name) => (
            <SelectItem
              key={name}
              text={name}
              selected={selectedNames.includes(name)}
              onClick={() => toggleName(name)}
            />
          ))}
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

export default BucketEditFamily;
