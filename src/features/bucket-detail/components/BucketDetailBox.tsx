import boxPng from '@/assets/bucket-detail/box.png';
import ProgressBar from './ProgressBar';
import Button from '@/components/button/Button';
import SupportSlider from './SupportSlider';
import type { MoneyBoxInfo } from '../apis/bucketDetail';
import { useNavigate } from 'react-router-dom';

type BucketDetailBoxProps = {
  moneyBoxInfo: MoneyBoxInfo;
  bucketId: string;
};

const BucketDetailBox = ({ moneyBoxInfo, bucketId }: BucketDetailBoxProps) => {
  const navigate = useNavigate();

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
              {moneyBoxInfo.balance} 원
            </span>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar percent={16} />
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
            label="버킷 삭제"
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
        <SupportSlider />
      </div>
    </div>
  );
};

export default BucketDetailBox;
