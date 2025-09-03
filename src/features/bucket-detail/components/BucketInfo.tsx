import type { Participant } from '@/features/family/apis/familyApi';

type BucketInfoProps = {
  withWho: string;
  targetAmount: number;
  targetPeriod: string;
  participants?: Participant[];
};

const BucketInfo = ({
  withWho,
  targetAmount,
  targetPeriod,
}: BucketInfoProps) => {
  return (
    <div className="bg-btn-default-bg mx-6 mt-10 rounded-md py-5 pl-5">
      <div className="text-text-secondary">
        <span className="font-hana-bold text-2xl">누구와 &nbsp;|</span>
        <span className="font-hana-regular text-2xl"> &nbsp;{withWho}</span>
      </div>

      <div className="text-text-secondary">
        <span className="font-hana-bold text-2xl">목표 금액 &nbsp;|</span>
        <span className="font-hana-regular text-2xl">
          {' '}
          &nbsp;{targetAmount.toLocaleString()} 원
        </span>
      </div>

      <div className="text-text-secondary">
        <span className="font-hana-bold text-2xl">목표 기간 &nbsp;|</span>
        <span className="font-hana-regular text-2xl">
          {' '}
          &nbsp;{targetPeriod} 까지
        </span>
      </div>
    </div>
  );
};

export default BucketInfo;
