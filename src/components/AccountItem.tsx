import CheckIcon from '@/assets/common/CheckIcon';
import HanaIcon from '@/assets/common/HanaIcon';
import type { AccountItemProps } from '@/types/common';

const AccountItem = ({
  accountName = '달달 하나 통장',
  accountNum = '352-1022-1234-12',
  selected = false,
  onClick,
}: AccountItemProps) => {
  return (
    <div
      className={`flex h-[66px] w-full cursor-pointer items-center justify-between rounded-md py-2 pr-2 pl-3 shadow-sm transition-colors ${selected ? 'bg-accent-secondary' : 'bg-btn-default-bg'}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4">
        <HanaIcon />
        <div className="flex flex-col">
          <span className="font-hana-bold text-primary text-xl">
            {accountName}
          </span>
          <span className="font-hana-regular text-lg">{accountNum}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <CheckIcon selected={selected} />
      </div>
    </div>
  );
};

export default AccountItem;
