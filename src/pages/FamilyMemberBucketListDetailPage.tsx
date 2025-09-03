import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/button/Button';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import BucketDetailHeader from '@/features/bucket-detail/components/BucketDetailHeader';
import BucketInfo from '@/features/bucket-detail/components/BucketInfo';
import SupportSlider from '@/features/bucket-detail/components/SupportSlider';
import { fetchFamilyBucketDetail } from '@/features/family/apis/familyApi';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { useSupportHistory } from '@/features/support/hooks/useSupportHistory';

const FamilyMemberBucketListDetailPage = () => {
  const navigate = useNavigate();
  const { id: bucketId, memberId } = useParams<{
    id: string;
    memberId: string;
  }>();
  const { data: bucketDetail } = useQuery({
    queryKey: ['familyBucketDetail', bucketId],
    queryFn: () => fetchFamilyBucketDetail(bucketId!),
    enabled: !!bucketId,
  });
  const { data: supportHistory, refetch: refetchSupportHistory } =
    useSupportHistory(Number(bucketId));
  const { data: groupInfo } = useGroupInfo();

  // 페이지 진입 시 body 스크롤 차단, 페이지 벗어날 때 복원
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 페이지 진입 시 supportHistory 자동 새로고침
  useEffect(() => {
    if (bucketId) {
      refetchSupportHistory();
    }
  }, [bucketId, refetchSupportHistory]);

  // 더미 데이터 (API 연동 전까지 사용)
  const dummyBucketDetail = {
    title: '결혼자금 보태주기',
    togetherFlag: false,
    targetAmount: 4000000,
    targetDate: '2026.09.10',
  };

  // 더미 데이터는 이제 필요 없음 (useSupportHistory로 실제 API 데이터 사용)

  const member = groupInfo?.members?.find(
    (m) => m.memberId.toString() === memberId
  ) || { name: '가족 구성원' };

  // 디버깅용 로그
  console.log('실제 API 데이터:', supportHistory);

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
      className="flex h-screen flex-col overflow-hidden"
      style={{ overscrollBehavior: 'none' }}
    >
      <BucketDetailHeader
        title={bucketDetail?.title ?? dummyBucketDetail.title}
        onClick={handleBack}
      />
      <BucketInfo
        withWho={
          bucketDetail?.participants && bucketDetail.participants.length > 1
            ? '함께'
            : '혼자'
        }
        targetAmount={
          bucketDetail?.targetAmount ?? dummyBucketDetail.targetAmount
        }
        targetPeriod={bucketDetail?.targetDate ?? dummyBucketDetail.targetDate}
        participants={bucketDetail?.participants ?? []}
      />
      <div className="bg-theme-secondary mt-7 flex flex-1 flex-col rounded-t-3xl p-6 pt-11">
        <div>
          <div className="!mb-14 flex items-center justify-between">
            <p className="font-hana-bold text-text-secondary !mb-0 text-2xl">
              응원
            </p>
            {bucketDetail?.bucketListStatus !== 'COMPLETED' && (
              <Button
                label="작성하기"
                intent="yellow"
                size="lg"
                className="!font-hana-bold !h-10 !w-32 !text-xl"
                onClick={() =>
                  navigate(`/bucket-support/${memberId}/${bucketId}`)
                }
              />
            )}
          </div>
          {supportHistory && supportHistory.length > 0 ? (
            <SupportSlider
              items={supportHistory.map((h) => ({
                id: String(h.id),
                text: h.message,
                author: h.supporterName,
                color: h.letterColor,
              }))}
            />
          ) : (
            <EmptyStateMessage
              title={
                bucketDetail?.bucketListStatus === 'COMPLETED'
                  ? '작성된 응원이 없어요'
                  : '아직 작성된 응원이 없어요'
              }
              subtitle={
                bucketDetail?.bucketListStatus === 'COMPLETED'
                  ? undefined
                  : '작성하기 버튼을 눌러 응원해 보세요!'
              }
              iconColor="brightness(0) saturate(100%) invert(40%) sepia(0%) sepia(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
              titleColor="text-text-secondary"
              subtitleColor="text-text-secondary"
              subtitleFont="regular"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FamilyMemberBucketListDetailPage;
