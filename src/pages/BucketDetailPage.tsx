import { useNavigate } from 'react-router-dom';
import BucketDetailBox from '@/features/bucket-detail/components/BucketDetailBox';
import BucketDetailHeader from '@/features/bucket-detail/components/BucketDetailHeader';
import BucketInfo from '@/features/bucket-detail/components/BucketInfo';
import { useBucketDetail } from '@/features/bucket-detail/hooks/useBucketDetail';
import { useParams } from 'react-router-dom';
import { useSupportHistory } from '@/features/support/hooks/useSupportHistory';

const BucketDetailPage = () => {
  const navigate = useNavigate();
  const { id: bucketId } = useParams<{ id: string }>();
  const { data: bucketDetail } = useBucketDetail(Number(bucketId));
  const { data: supportHistory, isLoading } = useSupportHistory(
    Number(bucketId)
  );

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <BucketDetailHeader
        title={bucketDetail?.title ?? ''}
        onClick={() => navigate(-1)}
      />
      <BucketInfo
        withWho={bucketDetail?.togetherFlag ? '함께' : '혼자'}
        targetAmount={bucketDetail?.targetAmount ?? 0}
        targetPeriod={bucketDetail?.targetDate ?? ''}
      />
      {bucketDetail?.moneyBoxInfo && (
        <BucketDetailBox
          bucketId={bucketId!}
          targetAmount={bucketDetail.targetAmount}
          moneyBoxInfo={bucketDetail.moneyBoxInfo}
          supportHistory={supportHistory}
        />
      )}
    </div>
  );
};

export default BucketDetailPage;
