import type { BucketStateItemProps } from '@/types/common';

const BucketStateItem = ({ text, selected, onClick }: BucketStateItemProps) => {
  return (
    <div
      className={`cursor-pointer w-20 h-10 rounded-3xl flex justify-center items-center ${selected ? 'bg-theme-primary' : 'bg-theme-secondary'}`}
      onClick={onClick}
    >
      <div
        className={`font-hana-regular ${selected ? 'text-white' : 'text-secondary-text'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default BucketStateItem;
