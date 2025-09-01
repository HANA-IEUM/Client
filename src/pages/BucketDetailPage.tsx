import { useNavigate } from 'react-router-dom';
import BucketDetailBox from '@/features/bucket-detail/components/BucketDetailBox';
import BucketDetailHeader from '@/features/bucket-detail/components/BucketDetailHeader';
import BucketInfo from '@/features/bucket-detail/components/BucketInfo';
import { useBucketDetail } from '@/features/bucket-detail/hooks/useBucketDetail';
import { useParams } from 'react-router-dom';
import type { MoneyBoxInfo } from '@/features/bucket-detail/apis/bucketDetail';

const BucketDetailPage = () => {
  const navigate = useNavigate();
  const { id: bucketId } = useParams<{ id: string }>();
  const { data: bucketDetail } = useBucketDetail(Number(bucketId));

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <BucketDetailHeader
        title={bucketDetail?.title ?? ''}
        onClick={() => navigate(-1)}
      />
      <BucketInfo
        withWho="혼자"
        targetAmount={bucketDetail?.targetAmount ?? 0}
        targetPeriod={bucketDetail?.targetDate ?? ''}
      />
      <BucketDetailBox
        bucketId={bucketId!}
        moneyBoxInfo={bucketDetail?.moneyBoxInfo as MoneyBoxInfo}
      />
    </div>
  );
};

export default BucketDetailPage;
