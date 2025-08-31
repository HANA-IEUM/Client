// Step 3: 함께할 그룹원
import SelectItem from '@/components/SelectItem.tsx';
import Button from '@/components/button/Button.tsx';
import type { SelectGroupMemberProps } from '@/features/bucket-create/types/props.ts';

export const SelectGroupMember = ({
  selectedNames,
  setSelectedNames,
  groupMemberInfo,
  onNext,
}: SelectGroupMemberProps) => {
  const toggleName = (memberId: number) => {
    setSelectedNames((prev: number[]) =>
      prev.includes(memberId)
        ? prev.filter((n) => n !== memberId)
        : [...prev, memberId]
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
            {groupMemberInfo.map((data) => (
              <SelectItem
                key={data.memberId}
                text={data.name}
                selected={selectedNames.includes(data.memberId)}
                onClick={() => toggleName(data.memberId)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button label="다 음" size="full-lg" intent="green" onClick={onNext} />
    </div>
  );
};
