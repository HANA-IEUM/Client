import type { BucketListItemProps } from '@/types/common';
import BucketListCheckIcon from '@/assets/common/BucketListCheckIcon';

import tripImg from '@/assets/common/bucketlist-category/trip.svg';
import hobbyImg from '@/assets/common/bucketlist-category/hobby.svg';
import healthImg from '@/assets/common/bucketlist-category/health.svg';
import familySupportImg from '@/assets/common/bucketlist-category/familySupport.svg';
import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';

const BucketListItem = ({
  text = '유럽여행 가기',
  date = '2024.09.10',
  category,
  completed,
  onClick,
}: BucketListItemProps) => {
  const IMG_MAP: Record<BucketCategoryType, string> = {
    TRIP: tripImg,
    HOBBY: hobbyImg,
    FAMILY: familySupportImg,
    HEALTH: healthImg,
    '': '',
  };
  const imgSrc = IMG_MAP[category];

  return (
    <div
      className="w-full h-[66px] flex justify-between items-center cursor-pointer py-2 pl-3 pr-4 shadow-sm rounded-md transition-colors bg-btn-default-bg"
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-4">
        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
            className="size-10 rounded-full object-cover"
            loading="lazy"
          />
        )}
        <div className="flex flex-col">
          <span className="font-hana-bold text-primary text-xl">{text}</span>
          <span className="font-hana-regular text-base">{date}</span>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <BucketListCheckIcon completed={completed} />
      </div>
    </div>
  );
};

export default BucketListItem;
