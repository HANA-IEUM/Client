import { useState } from 'react';
import Button from '@/components/button/Button';
import SelectItem from '@/components/SelectItem';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import Header from '@/components/Header';

type BucketEditFamilyProps = {
  onNext: () => void;
  onBack: () => void;
  onChangeMembers: (ids: number[]) => void;
};

const BucketEditFamily = ({
  onNext,
  onBack,
  onChangeMembers,
}: BucketEditFamilyProps) => {
  const { data: groupInfo } = useGroupInfo();
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);

  const toggleMember = (id: number) => {
    let updated: number[];
    if (selectedMemberIds.includes(id)) {
      updated = selectedMemberIds.filter((m) => m !== id);
    } else {
      updated = [...selectedMemberIds, id];
    }
    setSelectedMemberIds(updated);
    onChangeMembers(updated);
  };

  const members = groupInfo?.members ?? [];

  return (
    <div className="relative h-full flex flex-col items-center w-full px-6 pb-5">
      <Header onClick={onBack} />
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
          {members.map((member) => (
            <SelectItem
              key={member.memberId}
              text={member.name}
              selected={selectedMemberIds.includes(member.memberId)}
              onClick={() => toggleMember(member.memberId)}
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
