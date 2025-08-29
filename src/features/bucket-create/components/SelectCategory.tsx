import type { IconColor } from '@/types/common.ts';
import BucketListCategoryItem from '@/components/BucketListCategoryItem.tsx';
import type { SelectCategoryProps } from '@/features/bucket-create/types/types.ts';

// Step 1: 카테고리 선택
export const SelectCategory = ({
  setCategory,
  onNext,
}: SelectCategoryProps) => {
  const categories: Array<{ id: string; label: string; color: IconColor }> = [
    { id: 'TRAVEL', label: '여행', color: 'pink' },
    { id: 'HOBBY', label: '취미', color: 'blue' },
    { id: 'HEALTH', label: '건강', color: 'yellow' },
    { id: 'FAMILY_SUPPORT', label: '가족지원', color: 'green' },
  ];
  const handleSelectCategory = (str: string) => {
    setCategory(str);
    onNext();
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          <span className="font-hana-bold">버킷리스트의 카테고리</span>를
          <br />
          선택해 주세요
        </p>
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {categories.map((cat) => (
            <BucketListCategoryItem
              text={cat.label}
              color={cat.color}
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
