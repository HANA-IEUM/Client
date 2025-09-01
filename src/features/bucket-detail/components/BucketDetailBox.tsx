import boxPng from '@/assets/bucket-detail/box.png';
import ProgressBar from './ProgressBar';
import Button from '@/components/button/Button';
import SupportSlider from './SupportSlider';
import type { MoneyBoxInfo } from '../apis/bucketDetail';
import { useNavigate } from 'react-router-dom';
import { useDeleteBucket } from '../hooks/useDeleteBucket';
import { showSuccess } from '@/lib/toast';
import { showError } from '@/lib/toast';
import type { SupportHistory } from '@/types/supportHistory';

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
    <div className="bg-theme-primary rounded-t-3xl min-h-screen mt-7 p-5 scrollbar-hide flex flex-col gap-12">
      <div>
        <p className="text-white font-hana-bold text-2xl">박스</p>
        <div className="bg-theme-secondary w-full flex items-center gap-4 p-5 rounded-lg">
          <div className="bg-white w-14 h-14 rounded-sm flex justify-center items-center">
            <img src={boxPng} width={32} height={32} />
          </div>

          <div className="flex flex-col text-text-secondary">
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
        <p className="text-white font-hana-bold text-2xl">관리</p>
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
        <p className="text-white font-hana-bold text-2xl">응원</p>
        <SupportSlider
          items={mapSupportHistoryToCheers(supportHistory ?? [])}
        />
      </div>
    </div>
  );
};

export default BucketDetailBox;
