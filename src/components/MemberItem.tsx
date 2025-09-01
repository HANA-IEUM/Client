import type { MemberItemProps } from '@/types/common';
import Button from '@/components/button/Button';
import starBoy from '@/assets/common/starBoy.png';

const MemberItem = ({ name = '원윤서', onSupportClick }: MemberItemProps) => {
  return (
    <div className="w-full bg-btn-default-bg rounded-3xl flex items-center justify-between py-2 px-6 mb-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
          <img
            src={starBoy}
            alt={name}
            className="w-8 h-10 rounded-full object-cover"
          />
        </div>

        <span className="font-hana-bold text-text-primary text-xl">{name}</span>
      </div>

      <Button
        intent="green"
        size="sm"
        className="!w-24 !h-7 !text-base !font-hana-bold"
        onClick={onSupportClick}
      >
        응원 가기
      </Button>
    </div>
  );
};

export default MemberItem;
