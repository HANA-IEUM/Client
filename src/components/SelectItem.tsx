import type { SelectItemProps } from '@/types/common';

const SelectItem = ({ text, selected, onClick }: SelectItemProps) => {
  return (
    <div
      className={`cursor-pointer w-full h-28 rounded-3xl flex justify-center items-center ${selected ? 'bg-theme-primary' : 'bg-btn-default-bg'}`}
      onClick={onClick}
    >
      <div
        className={`font-hana-bold text-2xl ${selected ? 'text-white' : 'text-secondary-text'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default SelectItem;
