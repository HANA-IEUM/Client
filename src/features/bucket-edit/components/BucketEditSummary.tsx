import Lottie from 'lottie-react';

import success from '@/assets/bucket-edit/success.json';
import Button from '@/components/button/Button';

type BucketEditSummaryProps = {
  onConfirm: () => void;
};

const BucketEditSummary = ({ onConfirm }: BucketEditSummaryProps) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-12 pb-5">
      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>
          <br />
          버킷리스트가
          <br />
          <span className="font-hana-bold">성공적으로 수정되었어요</span>
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Lottie animationData={success} loop={false} className="h-80 w-80" />
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <div className="flex gap-5">
          <Button
            onClick={onConfirm}
            intent="green"
            label="수정 완료"
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BucketEditSummary;
