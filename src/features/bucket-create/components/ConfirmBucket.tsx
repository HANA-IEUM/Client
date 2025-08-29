import { useNavigate } from 'react-router-dom';
import confettiGif from '@/assets/bucket-detail/confetti.gif';
import Button from '@/components/button/Button.tsx';
import type { ConfirmBucketProps } from '@/features/bucket-create/types/types.ts';

// Step 7: 최종 화면
export const ConfirmBucket = ({ title, onSubmit }: ConfirmBucketProps) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
    onSubmit();
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl mb-3">
          <span className="font-hana-bold">{title}</span> 버킷리스트와
          <br />
          박스가 성공적으로
          <br />
          등록되었어요
        </p>
        <div className="w-80 justify-start">
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_R']">
            박스를 모두 채우면 다양한{' '}
          </span>
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_B']">
            제휴 혜택
          </span>
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_R']">
            을<br />
            받을 수 있어요
          </span>
        </div>
        <img src={confettiGif} alt={'축하해요!'} />
      </div>
      <Button
        label="확 인"
        size="full-lg"
        font="regular"
        intent="green"
        onClick={goHome}
      />
    </div>
  );
};
