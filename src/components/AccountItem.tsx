import type { AccountItemProps } from '@/types/common';
import CheckIcon from '@/assets/common/CheckIcon';
import HanaIcon from '@/assets/common/HanaIcon';

const AccountItem = ({
  accountName = '달달 하나 통장',
  accountNum = '352-1022-1234-12',
  selected = false,
  onClick,
}: AccountItemProps) => {
  return (
    <div
      className={`w-full h-[66px] flex justify-between items-center cursor-pointer py-2 pl-3 pr-2 shadow-sm rounded-md transition-colors
        ${selected ? 'bg-accent-secondary' : 'bg-btn-default-bg'}`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-4">
        <HanaIcon />
        <div className="flex flex-col">
          <span className="font-hana-bold text-primary text-xl">
            {accountName}
          </span>
          <span className="font-hana-regular text-lg">{accountNum}</span>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <CheckIcon selected={selected} />
      </div>
    </div>
  );
};

export default AccountItem;
