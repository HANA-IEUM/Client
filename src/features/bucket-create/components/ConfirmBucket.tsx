import { useNavigate } from 'react-router-dom';

import confettiGif from '@/assets/bucket-detail/confetti.gif';
import Button from '@/components/button/Button.tsx';
import type { ConfirmBucketProps } from '@/features/bucket-create/types/props.ts';

// Step 7: 최종 화면
export const ConfirmBucket = ({ title, onSubmit }: ConfirmBucketProps) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
    onSubmit();
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular mb-3 text-3xl">
          <span className="font-hana-bold">{title}</span>
          <br />
          버킷리스트와
          <br />
          박스가 성공적으로
          <br />
          등록되었어요
        </p>
        <div className="font-hana-regular w-80 justify-start">
          <span className="text-lg text-zinc-800">
            박스를 모두 채우면 다양한{' '}
          </span>
          <span className="font-hana-bold text-lg text-zinc-800">
            제휴 혜택
          </span>
          <span className="text-lg text-zinc-800">
            을<br />
            받을 수 있어요
          </span>
        </div>
        <img src={confettiGif} alt={'축하해요!'} />
      </div>
      <Button label="확 인" size="full" intent="green" onClick={goHome} />
    </div>
  );
};
