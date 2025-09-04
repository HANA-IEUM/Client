import Lottie from 'lottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import boxPng from '@/assets/bucket-detail/box.png';
import giftJson from '@/assets/bucket-detail/gift.json';
import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import { showError, showSuccess } from '@/lib/toast';
import type { SupportHistory } from '@/types/supportHistory';

import BucketManageButtons from './BucketManageButtons';
import ProgressBar from './ProgressBar';
import SupportSlider from './SupportSlider';
import type { MoneyBoxInfo } from '../apis/bucketDetail';
import { useCompleteBucket } from '../hooks/useCompleteBucket';
import { useDeleteBucket } from '../hooks/useDeleteBucket';

type BucketDetailBoxProps = {
  moneyBoxInfo: MoneyBoxInfo;
  bucketId: string;
  targetAmount: number;
  supportHistory?: SupportHistory[];
  bucketListStatus: 'IN_PROGRESS' | 'COMPLETED';
  canComplete: boolean;
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
  bucketListStatus,
  canComplete,
}: BucketDetailBoxProps) => {
  const navigate = useNavigate();

  const { mutate: completeBucket } = useCompleteBucket(Number(bucketId));
  const { mutate: deleteBucket, isPending } = useDeleteBucket(Number(bucketId));
  const [isAchieveSheetOpen, setIsAchieveSheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);

  const onClose = () => {
    setIsAchieveSheetOpen(false);
    navigate('/home');
  };

  // 수정
  const handleEdit = () => {
    navigate(`/bucket-edit/${bucketId}`);
  };

  const handleDelete = () => {
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = () => {
    deleteBucket(undefined, {
      onSuccess: () => {
        showSuccess('버킷이 삭제되었습니다.');
        navigate('/home');
      },
      onError: () => {
        showError('삭제 중 오류가 발생했습니다.');
      },
    });
  };

  // 삭제
  // const handleDelete = () => {
  //   deleteBucket(undefined, {
  //     onSuccess: () => {
  //       showSuccess('버킷이 삭제되었습니다.');
  //       navigate('/home');
  //     },
  //     onError: () => {
  //       showError('삭제 중 오류가 발생했습니다.');
  //     },
  //   });
  // };

  // 달성 완료
  const handleComplete = () => {
    completeBucket(undefined, {
      onSuccess: () => setIsAchieveSheetOpen(true),
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
        <BucketManageButtons
          onEdit={handleEdit}
          onDelete={handleDelete}
          onComplete={handleComplete}
          isDeleting={isPending}
          canComplete={canComplete}
          bucketListStatus={bucketListStatus}
        />
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
        isOpen={isDeleteSheetOpen}
        onClose={() => setIsDeleteSheetOpen(false)}
      >
        <div className="mt-6 flex flex-col gap-6">
          <p className="font-hana-bold text-accent-primary text-3xl">⚠️ 주의</p>
          <p className="font-hana-regular text-text-primary text-3xl">
            <span className="font-hana-bold">버킷리스트를 삭제하면</span>
            <br />
            개설한 <span className="font-hana-bold">머니박스</span>도
            <br /> 자동으로 삭제되고
            <br />
            <span className="font-hana-bold">이자</span>도 받을 수 없어요
          </p>
          <p className="font-hana-regular text-3xl">
            원금은 연결된 주계좌로 <br />
            이체돼요
          </p>
          <p className="font-hana-regular text-3xl">그래도 삭제하시겠어요?</p>
          <div className="flex w-full gap-2">
            <Button
              intent="gray"
              label="취소"
              className="w-1/3"
              onClick={() => setIsDeleteSheetOpen(false)}
            />
            <Button
              intent="red"
              label="삭제"
              className="w-2/3"
              onClick={confirmDelete}
              disabled={isPending}
            />
          </div>
        </div>
      </BottomSheet>

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
