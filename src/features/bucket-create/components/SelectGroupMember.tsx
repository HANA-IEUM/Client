// Step 3: 함께할 그룹원
import SelectItem from '@/components/SelectItem.tsx';
import Button from '@/components/button/Button.tsx';
import type { SelectGroupMemberProps } from '@/features/bucket-create/types/types.ts';

export const SelectGroupMember = ({
  selectedNames,
  setSelectedNames,
  onNext,
}: SelectGroupMemberProps) => {
  //TODO 가족 구성원 받아오기
  const familyNames = ['원윤서', '손혜정', '김대현', '김기보', '정재희'];
  const toggleName = (name: string) => {
    setSelectedNames((prev: string[]) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          버킷리스트를 <span className="font-hana-bold">함께할 가족</span>을
          <br />
          모두 선택해 주세요
        </p>
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
      </div>
      <Button label="다 음" size="full-lg" intent="green" onClick={onNext} />
    </div>
  );
};
