import { useEffect, useRef, useState } from 'react';

import messageIcon from '@/assets/common/user/message.png';
import Button from '@/components/button/Button.tsx';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import { useVerification } from '@/features/auth/hooks/useVerification.ts';
import { useVerificationConfirm } from '@/features/auth/hooks/useVerificationConfirm.ts';
import { showError, showSuccess } from '@/lib/toast';

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
      showSuccess('인증번호를 재전송했어요.');
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
      showError('인증번호가 올바르지 않아요.');
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
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6">
        <div className="bg-theme-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <img src={messageIcon} alt="message" className="h-10 w-10" />
        </div>
        <p className="font-hana-regular text-left text-3xl">
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
