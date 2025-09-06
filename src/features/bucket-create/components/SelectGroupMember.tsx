// Step 3: 함께할 그룹원
import Button from '@/components/button/Button.tsx';
import SelectItem from '@/components/SelectItem.tsx';
import type { SelectGroupMemberProps } from '@/features/bucket-create/types/props.ts';
import { useAuth } from '@/hooks/useToken.ts';

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
  const { user } = useAuth();
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl">
          버킷리스트를 <span className="font-hana-bold">함께할 가족</span>을
          <br />
          모두 선택해 주세요
        </p>
        <div className="scrollbar-hide mb-5 min-h-0 w-full overflow-y-auto pr-1 pb-24">
          <div className="mt-6 grid grid-cols-2 gap-3">
            {groupMemberInfo
              .filter((member) => member.memberId !== Number(user?.sub))
              .map((data) => (
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
      <Button label="다 음" size="full" intent="green" onClick={onNext} />
    </div>
  );
};
