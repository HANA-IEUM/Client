import { useNavigate } from 'react-router-dom';

import boxPng from '@/assets/bucket-detail/box.png';
import Button from '@/components/button/Button';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import { showSuccess } from '@/lib/toast';
import { showError } from '@/lib/toast';
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
  const { mutate: deleteBucket, isPending } = useDeleteBucket(Number(bucketId));

  const percent =
    targetAmount > 0 ? (moneyBoxInfo.balance / targetAmount) * 100 : 0;

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
    </div>
  );
};

export default BucketDetailBox;
