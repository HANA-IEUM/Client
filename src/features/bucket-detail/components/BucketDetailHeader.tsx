import backIconSvg from '@/assets/common/header/backIcon.svg';
import type { BucketDetailHeaderProps } from '@/types/common';

const BucketDetailHeader = ({ onClick, title }: BucketDetailHeaderProps) => {
  return (
    <div className="relative flex w-full items-center px-6 pt-7 pb-5">
      <img
        src={backIconSvg}
        className="absolute left-6 cursor-pointer"
        onClick={onClick}
      />
      <span className="text-text-primary font-hana-bold w-full text-center text-3xl">
        {title}
      </span>
    </div>
  );
};

export default BucketDetailHeader;
