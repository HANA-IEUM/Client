import { useState } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import SelectItem from '@/components/SelectItem';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';

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
    <div className="relative flex h-full w-full flex-col items-center px-6 pb-5">
      <Header onClick={onBack} />
      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>
          <br />
          버킷리스트를 <span className="font-hana-bold">함께할 가족</span>을
          <br />
          모두 선택해 주세요
        </p>
      </div>

      <div className="scrollbar-hide mb-5 min-h-0 w-full overflow-y-auto pr-1 pb-24">
        <div className="mt-6 grid grid-cols-2 gap-3">
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

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
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
