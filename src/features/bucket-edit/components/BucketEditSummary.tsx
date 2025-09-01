import Button from '@/components/button/Button';
import Lottie from 'lottie-react';
import success from '@/assets/bucket-edit/success.json';

type BucketEditSummaryProps = {
  onConfirm: () => void;
};

const BucketEditSummary = ({ onConfirm }: BucketEditSummaryProps) => {
  return (
    <div className="relative h-full flex flex-col items-center w-full pt-12 px-6 pb-5">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <br />
          버킷리스트가
          <br />
          <span className="font-hana-bold">성공적으로 수정되었어요</span>
        </p>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <Lottie animationData={success} loop={false} className="w-80 h-80" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <div className="flex gap-5">
          <Button
            onClick={onConfirm}
            intent="green"
            label="수정 완료"
            className="cursor-pointer w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BucketEditSummary;
