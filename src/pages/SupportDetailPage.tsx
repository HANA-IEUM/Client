import Header from '@/components/Header';
import { CheerCard } from '@/features/bucket-detail/components/SupportSlider';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import moneyGif from '@/assets/support/money.gif';
import { useSupportDetail } from '@/features/support/hooks/useSupportDetail';
import { useParams } from 'react-router-dom';
import { formatKoreanDateTime } from '@/utils/dateFormat';

const SupportDetailPage = () => {
  const navigate = useNavigate();
  const { id: supportId } = useParams<{ id: string }>();
  const { data: supportDetail } = useSupportDetail(Number(supportId));

  return (
    <div>
      <div className="px-6">
        <Header onClick={() => navigate(-1)} />
      </div>

      <div className="flex justify-center items-center px-12 mt-10">
        <CheerCard
          text={supportDetail?.message ?? ''}
          author={supportDetail?.supporterName ?? ''}
          color={supportDetail?.letterColor ?? 'PINK'}
        />
      </div>

      <div className="px-6 mt-12">
        {supportDetail?.supportType === 'SPONSOR' && (
          <div>
            <p className="font-hana-regular text-3xl">
              <span className="font-hana-bold text-3xl">후원금액 : </span>
              {supportDetail?.supportAmount} 원
            </p>
          </div>
        )}
        <p className="font-hana-regular text-3xl">
          <span className="font-hana-bold text-3xl">작성일자 : </span>
          {supportDetail?.supportedAt
            ? formatKoreanDateTime(supportDetail.supportedAt)
            : '작성일자 없음'}
        </p>
      </div>

      {supportDetail?.supportType === 'SPONSOR' && (
        <div className="w-full">
          <img src={moneyGif} />
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent="green"
          label="확인"
          size="full"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default SupportDetailPage;
