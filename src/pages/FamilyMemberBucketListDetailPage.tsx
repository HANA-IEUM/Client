import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/button/Button';
import BucketDetailHeader from '@/features/bucket-detail/components/BucketDetailHeader';
import BucketInfo from '@/features/bucket-detail/components/BucketInfo';
import SupportSlider from '@/features/bucket-detail/components/SupportSlider';
import { useBucketDetail } from '@/features/bucket-detail/hooks/useBucketDetail';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { useSupportHistory } from '@/features/support/hooks/useSupportHistory';

const FamilyMemberBucketListDetailPage = () => {
  const navigate = useNavigate();
  const { id: bucketId, memberId } = useParams<{
    id: string;
    memberId: string;
  }>();
  const { data: bucketDetail } = useBucketDetail(Number(bucketId));
  const { data: supportHistory } = useSupportHistory(Number(bucketId));
  const { data: groupInfo } = useGroupInfo();

  // 더미 데이터 (API 연동 전까지 사용)
  const dummyBucketDetail = {
    title: '결혼자금 보태주기',
    togetherFlag: false,
    targetAmount: 4000000,
    targetDate: '2026.09.10',
    moneyBoxInfo: {
      accountId: 1,
      boxName: '결혼자금 박스',
      accountNumber: '1234567890',
      balance: 1500000,
      hasMoneyBox: true,
    },
  };

  const dummySupportHistory = [
    {
      id: 1,
      bucketListId: Number(bucketId),
      bucketListTitle: '결혼자금 보태주기',
      supporterName: '유진',
      supportType: 'CHEER' as const,
      supportAmount: 50000,
      message: '엄마가 유럽가는 그 날까지! 파이팅이에요 :)',
      letterColor: 'PINK' as const,
      supportedAt: '2025-01-15T10:00:00Z',
    },
    {
      id: 2,
      bucketListId: Number(bucketId),
      bucketListTitle: '결혼자금 보태주기',
      supporterName: '민수',
      supportType: 'SPONSOR' as const,
      supportAmount: 30000,
      message: '응원합니다! 꼭 이루세요 💪',
      letterColor: 'BLUE' as const,
      supportedAt: '2025-01-14T15:30:00Z',
    },
  ];

  const member = groupInfo?.members?.find(
    (m) => m.memberId.toString() === memberId
  ) || { name: '가족 구성원' };

  // 디버깅용 로그
  console.log('더미 데이터:', dummySupportHistory);
  const mappedSupportItems = dummySupportHistory.map((h) => ({
    id: String(h.id),
    text: h.message,
    author: h.supporterName,
  }));
  console.log('매핑된 데이터:', mappedSupportItems);

  const handleBack = () => {
    navigate(`/family/member/${memberId}/bucket`);
  };

  if (!member) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="font-hana-regular text-text-secondary text-lg">
          구성원을 찾을 수 없습니다
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scrollbar-hide flex h-screen flex-col overflow-hidden"
    >
      <BucketDetailHeader
        title={bucketDetail?.title ?? dummyBucketDetail.title}
        onClick={handleBack}
      />
      <BucketInfo
        withWho={
          (bucketDetail?.togetherFlag ?? dummyBucketDetail.togetherFlag)
            ? '함께'
            : '혼자'
        }
        targetAmount={
          bucketDetail?.targetAmount ?? dummyBucketDetail.targetAmount
        }
        targetPeriod={bucketDetail?.targetDate ?? dummyBucketDetail.targetDate}
      />
      <div className="bg-theme-secondary mt-7 flex flex-1 flex-col rounded-t-3xl p-6 pt-11">
        <div>
          <div className="!mb-14 flex items-center justify-between">
            <p className="font-hana-bold text-text-secondary !mb-0 text-2xl">
              응원
            </p>
            <Button
              label="작성하기"
              intent="yellow"
              size="lg"
              className="!font-hana-bold !h-10 !w-32 !text-xl"
              onClick={() => navigate(`/bucket-support/${bucketId}`)}
            />
          </div>
          <SupportSlider items={mappedSupportItems} />
        </div>
      </div>
    </motion.div>
  );
};

export default FamilyMemberBucketListDetailPage;
