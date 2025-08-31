import { useEffect, useRef, useState } from 'react';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import { useVerification } from '@/features/auth/hooks/useVerification.ts';
import toast from 'react-hot-toast';
import checkCircleSvg from '@/assets/common/toast/checkCircle.svg';
import { useVerificationConfirm } from '@/features/auth/hooks/useVerificationConfirm.ts';
import messageIcon from '@/assets/common/user/message.png';
import Button from '@/components/button/Button.tsx';

export type PhoneVerificationProps = {
  phoneNumber: string;
  onNext: () => void;
};
export const PhoneVerification = ({
  phoneNumber,
  onNext,
}: PhoneVerificationProps) => {
  const [pin, setPin] = useState('');
  const boxInputRef = useRef<BoxInputHandle>(null);

  // 인증번호 발송을 위한 mutation
  const sendVerificationMutation = useVerification(
    () => {
      toast.custom(
        () => (
          <div className="max-w-[400px] mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
              <img
                src={checkCircleSvg}
                className="inline-block size-5"
                alt="성공"
              />
              <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
                인증번호를 재전송했어요
              </span>
            </div>
          </div>
        ),
        { duration: 2000, position: 'top-center', id: 'resend-ok' }
      );
    },
    () => {}
  );

  // 인증번호 검증을 위한 mutation
  const verificationConfirmMutation = useVerificationConfirm(
    () => {
      // 성공 시 다음 단계로 이동
      onNext();
    },
    () => {
      // 실패 시 토스트 알림을 띄우고 입력값을 초기화
      toast.error('인증번호가 올바르지 않아요.');
      setPin('');
      boxInputRef.current?.focus();
    }
  );

  useEffect(() => {
    boxInputRef.current?.focus();
  }, []);

  const handleResend = () => {
    sendVerificationMutation.mutate({
      to: phoneNumber,
    });
  };

  const handleConfirm = () => {
    verificationConfirmMutation.mutate({
      to: phoneNumber,
      verificationCode: pin,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={messageIcon} alt="message" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-left">
          <span className="font-hana-bold">{phoneNumber}</span>로 받은 <br />
          <span className="font-hana-bold">인증번호</span>를 입력해 주세요
        </p>
        <BoxInput ref={boxInputRef} length={6} onChange={setPin} value={pin} />
        <div className="text-center">
          <Button
            label="인증번호 재전송"
            font="regular"
            size="full-lg"
            intent="gray"
            onClick={handleResend}
          ></Button>
        </div>
      </div>
      <Button
        label="확 인"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={handleConfirm}
        disabled={pin.length !== 6 || verificationConfirmMutation.isPending} // 6자리 입력 & 로딩 중 아닐 때 활성화
        loading={verificationConfirmMutation.isPending}
      />
    </div>
  );
};
