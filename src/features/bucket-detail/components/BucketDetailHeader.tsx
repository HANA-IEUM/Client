import backIconSvg from '@/assets/common/header/backIcon.svg';
import type { BucketDetailHeaderProps } from '@/types/common';

const BucketDetailHeader = ({ onClick, title }: BucketDetailHeaderProps) => {
  return (
    <div className="w-full pt-7 px-6 pb-5 flex items-center">
      <img
        src={backIconSvg}
        className="cursor-pointer mr-9"
        onClick={onClick}
      />
      <span className="text-text-primary text-3xl font-hana-bold">{title}</span>
    </div>
  );
};

export default BucketDetailHeader;
