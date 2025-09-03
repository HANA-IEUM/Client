import Lottie from 'lottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import boxPng from '@/assets/bucket-detail/box.png';
import giftJson from '@/assets/bucket-detail/gift.json';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import { useCreateCoupon } from '@/features/coupon/hooks/useCreateCoupon';
import { showError, showSuccess } from '@/lib/toast';
import type { SupportHistory } from '@/types/supportHistory';

import ProgressBar from './ProgressBar';
import SupportSlider from './SupportSlider';
import type { MoneyBoxInfo } from '../apis/bucketDetail';
import { useDeleteBucket } from '../hooks/useDeleteBucket';

type BucketDetailBoxProps = {
  moneyBoxInfo: MoneyBoxInfo;
  bucketId: string;
  targetAmount: number;
  supportHistory?: SupportHistory[];
};

type Cheer = { id: string; text: string; author: string; color: string };

function mapSupportHistoryToCheers(history: SupportHistory[]): Cheer[] {
  return history.map((h) => ({
    id: String(h.id),
    text: h.message,
    author: h.supporterName,
    color: h.letterColor,
  }));
}

const BucketDetailBox = ({
  moneyBoxInfo,
  bucketId,
  targetAmount,
  supportHistory,
}: BucketDetailBoxProps) => {
  const navigate = useNavigate();
  const { mutate: createCoupon } = useCreateCoupon(Number(bucketId));
  const { mutate: deleteBucket, isPending } = useDeleteBucket(Number(bucketId));
  const [isAchieveSheetOpen, setIsAchieveSheetOpen] = useState(false);
  const onClose = () => {
    setIsAchieveSheetOpen(false);
    navigate('/home');
  };
  const onHandleCompleted = () => {
    createCoupon(undefined, {
      onSuccess: (couponCode) => {
        setIsAchieveSheetOpen(true);
      },
      onError: () => {
        showError('달성 완료 처리 중 오류가 발생했어요.');
      },
    });
  };

  const percent =
    targetAmount > 0
      ? Number(((moneyBoxInfo.balance / targetAmount) * 100).toFixed(1))
      : 0;

  return (
    <div className="bg-theme-primary scrollbar-hide mt-7 flex min-h-screen flex-col gap-12 rounded-t-3xl p-5">
      <div>
        <p className="font-hana-bold text-2xl text-white">박스</p>
        <div className="bg-theme-secondary flex w-full items-center gap-4 rounded-lg p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-white">
            <img src={boxPng} width={32} height={32} />
          </div>

          <div className="text-text-secondary flex flex-col">
            <span className="font-hana-regular text-xl">
              {moneyBoxInfo.boxName}
            </span>
            <span className="font-hana-bold text-2xl">
              {moneyBoxInfo.balance.toLocaleString()} 원
            </span>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar percent={percent} />
        </div>
      </div>

      <div>
        <p className="font-hana-bold text-2xl text-white">관리</p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => navigate(`/bucket-edit/${bucketId}`)}
            label="버킷 수정"
            intent="gray"
            size="xl"
            className="w-full !px-2"
          />
          <Button
            label={isPending ? '삭제 중입니다...' : '버킷 삭제'}
            onClick={() => {
              deleteBucket(undefined, {
                onSuccess: () => {
                  showSuccess('버킷이 삭제되었습니다.');
                  navigate('/home');
                },
                onError: () => {
                  showError('삭제 중 오류가 발생했습니다.');
                },
              });
            }}
            intent="gray"
            size="xl"
            className="w-full !px-2"
          />
          <Button
            onClick={onHandleCompleted}
            label="달성 완료"
            intent="yellow"
            size="xl"
            className="w-full !px-2"
          />
        </div>
      </div>

      <div>
        <p className="font-hana-bold text-2xl text-white">응원</p>
        {supportHistory && supportHistory.length > 0 ? (
          <SupportSlider items={mapSupportHistoryToCheers(supportHistory)} />
        ) : (
          <EmptyStateMessage title={'아직 받은 응원이나 후원이 없어요 💌'} />
        )}
      </div>

      <BottomSheet
        isOpen={isAchieveSheetOpen}
        onClose={() => setIsAchieveSheetOpen(false)}
      >
        <div className="flex flex-col items-center gap-6">
          <Lottie animationData={giftJson} loop={false} className="h-80 w-80" />
          <div className="text-3xl">
            <p className="font-hana-bold text-theme-primary">
              버킷리스트를 달성했어요!
            </p>
            <p className="font-hana-regular">
              하나이음에서 <br />
              <span className="font-hana-bold">제휴사 쿠폰</span>을 넣어드렸어요
            </p>
            <p className="font-hana-regular">
              <span className="font-hana-bold">공유앨범</span>에 가족과 함께한
              추억을 공유해 보세요
            </p>
          </div>
          <div className="flex w-full gap-2">
            <Button
              intent="gray"
              label="확인"
              className="w-1/3"
              onClick={onClose}
            />
            <Button
              intent="green"
              label="쿠폰함 가기"
              onClick={() => navigate('/coupon')}
              className="w-2/3"
            />
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default BucketDetailBox;
