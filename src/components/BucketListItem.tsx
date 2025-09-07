import familySupportImg from '@/assets/common/bucketlist-category/familySupport.svg';
import healthImg from '@/assets/common/bucketlist-category/health.svg';
import hobbyImg from '@/assets/common/bucketlist-category/hobby.svg';
import tripImg from '@/assets/common/bucketlist-category/trip.svg';
import BucketListCheckIcon from '@/assets/common/BucketListCheckIcon';
import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';
import type { BucketListItemProps } from '@/types/common';

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
      className="bg-btn-default-bg flex h-[66px] w-full cursor-pointer items-center justify-between rounded-md py-2 pr-4 pl-3 shadow-sm transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4">
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
          <span className="font-hana-regular text-base">
            목표 일자 - {date}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <BucketListCheckIcon completed={completed} />
      </div>
    </div>
  );
};

export default BucketListItem;
