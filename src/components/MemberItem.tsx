import starBoy from '@/assets/common/starBoy.png';
import Button from '@/components/button/Button';
import type { MemberItemProps } from '@/types/common';

const MemberItem = ({ name = '원윤서', onSupportClick }: MemberItemProps) => {
  return (
    <div className="bg-btn-default-bg mb-5 flex w-full items-center justify-between rounded-3xl px-6 py-2">
      <div className="flex items-center gap-4">
        <div className="bg-theme-secondary flex h-12 w-12 items-center justify-center rounded-full">
          <img
            src={starBoy}
            alt={name}
            className="h-10 w-8 rounded-full object-cover"
          />
        </div>

        <span className="font-hana-bold text-text-primary text-xl">{name}</span>
      </div>

      {onSupportClick && (
        <Button
          intent="green"
          size="sm"
          className="!font-hana-bold !h-7 !w-24 !text-base"
          onClick={onSupportClick}
        >
          응원 가기
        </Button>
      )}
    </div>
  );
};

export default MemberItem;
