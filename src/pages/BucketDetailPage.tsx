import { useNavigate } from 'react-router-dom';
import BucketDetailBox from '@/features/bucket-detail/components/BucketDetailBox';
import BucketDetailHeader from '@/features/bucket-detail/components/BucketDetailHeader';
import BucketInfo from '@/features/bucket-detail/components/BucketInfo';

const BucketDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <BucketDetailHeader
        title={'결혼자금 보태주기'}
        onClick={() => navigate(-1)}
      />
      <BucketInfo
        withWho="혼자"
        targetAmount={4000000}
        targetPeriod="2026.09.10"
      />
      <BucketDetailBox />
    </div>
  );
};

export default BucketDetailPage;
