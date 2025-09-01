import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';
import tripImg from '@/assets/common/bucketlist-category/trip.svg';
import hobbyImg from '@/assets/common/bucketlist-category/hobby.svg';
import healthImg from '@/assets/common/bucketlist-category/health.svg';
import familySupportImg from '@/assets/common/bucketlist-category/familySupport.svg';

const suggestions: { type: BucketCategoryType; title: string }[] = [
  { type: 'FAMILY', title: '유언장 작성·웰다잉 실천' },
  { type: 'HOBBY', title: '외국어 배우기' },
  { type: 'HOBBY', title: '한 가지 악기 마스터하기' },
  { type: 'TRIP', title: '가족(손주들)과 여행 가기' },
  { type: 'TRIP', title: '제주에서 한 달 살기' },
  { type: 'HOBBY', title: '제2의 직업 만들기' },
  { type: 'TRIP', title: '유럽 배낭여행하기' },
  { type: 'TRIP', title: '경이로운 대자연 경험하기' },
  { type: 'HOBBY', title: '내 이름으로 책 내보기' },
];

export const EmptyBucketList = () => {
  const randomSuggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];
  const IMG_MAP: Record<BucketCategoryType, string> = {
    TRIP: tripImg,
    HOBBY: hobbyImg,
    FAMILY: familySupportImg,
    HEALTH: healthImg,
    '': '',
  };
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <p className="text-xl font-hana-medium text-text-secondary mb-4">
        등록한 버킷리스트가 없어요
        <br />
        상단 버튼을 눌러 등록해 보세요
      </p>
      <div className="bg-btn-default-bg p-6 rounded-2xl w-full flex flex-col items-center gap-4">
        <img
          src={IMG_MAP[randomSuggestion.type]}
          alt=""
          className="size-20 rounded-full object-cover"
          loading="lazy"
        />
        <p className="text-2xl font-hana-regular text-text-primary !mb-0">
          이런 버킷리스트는 어떠세요?
        </p>
        <p className="text-3xl font-hana-bold text-theme-primary !mb-0">
          "{randomSuggestion.title}"
        </p>
      </div>
    </div>
  );
};
